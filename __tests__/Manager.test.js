const Manager = require("../lib/Manager");

describe("Manager class", () => {
  const manager = new Manager("Heather", 1, "heatherknoyes@gmail.com", 1);

  it("Should set initial properties based on object creation", () => {
    expect(manager.name).toBe("Heather");
    expect(manager.id).toBe(1);
    expect(manager.email).toBe("heatherknoyes@gmail.com");
    expect(manager.officeNumber).toBe(1);
  });

  describe("getRole", () => {
    it("Should return role", () => {
      expect(manager.getRole()).toBe("Manager");
    });
  });

  describe("getOfficeNumber", () => {
    it("Should return office number", () => {
      expect(manager.getOfficeNumber()).toBe(1);
    });
  });
});
