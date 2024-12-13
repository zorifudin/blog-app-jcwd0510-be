import app from "../../src/app";
import { prismaMock } from "../prisma";
import request from "supertest";
import * as argonLib from "../../src/lib/argon";

const reqBody = {
  email: "mock@mail.com",
  password: "mockPassword123",
};

// before
beforeAll(() => {
  //ini bakalan dijalankan sebelum testing pertama dijalankan
});

beforeEach(() => {
  // ini bakalan jalan sebelum setiap test
});

afterEach(() => {
  // ini bakalan jalan setelah setiap test
});

afterAll(() => {
  //ini bakalan dijalankan setelah testing terakhir
});

// truncate -> menghapus isi data dari sebuah table, tapi struktur datanya tidak dihapus, cuman datanya saja yang hilang

describe("POST /auth/login", () => {
  it("should login successfully", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValue(true);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return error if email not found", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid email address!");
  });

  it("should return error if password not match", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValue(false);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid password!");
  });
});
