const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("the header has the correct text", async () => {
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Blogster");
});

test("clicking login starts the OAuth flow", async () => {
  await page.click(".right a");
  const url = await page.url();

  const session =
    "eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWFlNWM5YTJkZjllZDIyZTVkODkyNTE0In19";
  const sessionSig = "uEXVcmJuVkAj_l58YwZ5jjBN0Gc";
  expect(url).toMatch(/accounts\.google.com/);
});

test("When signed in header shows the Logout button", async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual("Logout");
});
