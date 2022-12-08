
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import {
  createTuit,
  deleteTuit,
  findAllTuits,
} from "../services/tuits-service";
import Tuits from "../components/tuits";


describe("tuit list renders async", () => {
  // sample user to insert
  const nasa = {
    tuit: "helloworld",
    postedBy: "43577431cd4eab25f6a5660f",
  };


  beforeAll(() => {
    // remove any/all tuit to make sure we create it in the test
    return deleteTuit(nasa.postedBy);
  });


  afterAll(() => {
    // remove any data created
    return deleteTuit(nasa.postedBy);
  });

  test("user list renders async", async () => {
    const createhelloworldTuit = await createTuit(nasa);

    const allTuits = await findAllTuits();

    render(
      <HashRouter>
        <Tuits tuits={allTuits} />
      </HashRouter>
    );
    const linkElement = screen.getAllByText(/helloworld/i);
    expect(linkElement[0]).toBeInTheDocument();
  });
});
