"use server";

export async function registerUserAction(formData: FormData) {
  const field = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };

  console.log("########################################");
  console.log(field);
  console.log("########################################");
}
