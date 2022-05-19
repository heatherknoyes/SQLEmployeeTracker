const Employee = require("../lib/Employee");

describe("Employee class", () => {
  const employee = new Employee("Heather", 1, "heatherknoyes@gmail.com");

  it("Should set initial properties based on object creation", () => {
    expect(employee.name).toBe("Heather");
    expect(employee.id).toBe(1);
    expect(employee.email).toBe("heatherknoyes@gmail.com");
  });

  describe("getRole", () => {
    it("Should return role", () => {
      expect(employee.getRole()).toBe("Employee");
    });
  });
});
