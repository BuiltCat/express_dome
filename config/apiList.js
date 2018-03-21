module.exports = {
  users: [
    {
      method: "get",
      url: "/users",
      founction: "getAllusers",
      success: "userList",
      error: "error"
    },
    {
      method: "post",
      url: "/users",
      founction: "addNewUser",
      param: ["username", "name", "password"],
      success: "newUser",
      error: "error"
    },
    {
      method: "get",
      url: "/users/id/:id",
      founction: "getUserById",
      success: "user",
      error: "error"
    },
    {
      method: "get",
      url: "/users/username/:username",
      founction: "getUserByusername",
      success: "user",
      error: "error"
    },
    {
      method: "post",
      url: "/users/login",
      founction: "login",
      param: ["username", "password"],
      success: "userWithAuth",
      error: "error"
    }
  ],
  pages: [
    {
      method: "get",
      url: "/pages",
      founction: "getPagesList",
      success: "pagesList",
      error: "error"
    },
    {
      method: "get",
      url: "/pages/:id",
      founction: "getPagesbyId",
      success: "page",
      error: "error"
    },
    {
      method: "post",
      url: "/pages/:id",
      founction: "getPagesbyId",
      success: "page",
      error: "error"
    }
  ]
};
