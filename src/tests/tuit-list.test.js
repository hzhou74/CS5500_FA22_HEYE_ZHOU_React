import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, deleteTuit, findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];


const array = MOCKED_USERS.map((username, index) => {
    return {
        _id: index,
        postedBy: { username: username },
        tuit: MOCKED_TUITS[index],
    };
});



test("tuit list renders static tuit array", () => {
    render(
        <HashRouter>
            <Tuits tuits={array} />
        </HashRouter>
    );
    const linkElement = screen.getByText(/bob@bob/i);
    expect(linkElement).toBeInTheDocument();
});



test("tuit list renders mocked", async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: { tuits:array } })
    );

    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits} />
        </HashRouter>
    );

    const tuit = screen.getByText(/bob@bob/i);
    expect(tuit).toBeInTheDocument();
});

test("tuit list renders async", async () => {
  "See tuit-list-asychronous.test.js"
});

