import { UserList } from "../components/profile/user-List";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import {
  createUser,
  deleteUsersByUsername,
  findAllUsers,
} from "../services/users-service";

describe("user list renders asyn", () => {
  // sample user to insert
  const bob = {
    username: "bob",
    password: "alice",
    email: "alice@aliens.com",
  };

  beforeAll(() => {

    return deleteUsersByUsername(bob.username);
  });

  afterAll(() => {
    return deleteUsersByUsername(bob.username);
  });

  test("user list renders async", async () => {
    const createNewUser = await createUser(bob);

    const users = await findAllUsers();
    render(
      <HashRouter>
        <UserList users={users} />
      </HashRouter>
    );
    const linkElement = screen.getAllByText(/alice/i);
    expect(linkElement[0]).toBeInTheDocument();
  });
});
