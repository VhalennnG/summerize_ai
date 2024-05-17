"use server";

export async function registerUserAction(formData: FormData) {
  console.log("Hello From Register User Action");

  const field = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };

  console.log("########################################");
  console.log(field);
  console.log("########################################");
}
