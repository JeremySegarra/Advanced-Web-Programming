/*
 */

export interface User {
  firstName: string;
  lastName: string;
  handle: string;
  password: string;
  email: string;
  pic: string;
  id: number;
}

export const list: User[] = [
  {
    firstName: "John",
    lastName: "Doe",
    handle: "sfsdf",
    password: "password",
    email: "hogj@.com",
    pic: "/assets/logo.png",
    id: 1,
  },
  {
    firstName: "vlasdd",
    lastName: "putin",
    handle: "sfsdfasd",
    password: "password2",
    email: "hogjadaw@.com",
    pic: "/assets/logo.png",
    id: 1,
  },
  {
    firstName: "kim jong",
    lastName: "un",
    handle: "vp",
    password: "password",
    email: "hogawdajadaw@.org",
    pic: "/assets/logo.png",
    id: 1,
  },
];
