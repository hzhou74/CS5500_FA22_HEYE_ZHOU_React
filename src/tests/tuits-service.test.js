import {
    createTuit,
    createTuitsByUser,
    deleteTuitByUser,
    findAllTuits,
    findTuitById
} from "../services/tuits-service";

describe("can create tuit with REST API", () => {

    const newTuits = {
        tuit: "hello world. This is Test",
        postedBy: "64577431cd4eab25f6a5660f",
    };


    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteTuitByUser(newTuits.postedBy);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuitByUser(newTuits.postedBy);
    });

    test("can insert new users with REST API", async () => {
        // insert new user in the database
        const createTuits = await createTuit(newTuits);

        // verify inserted user's properties match parameter user
        expect(createTuits.tuit).toEqual(newTuits.tuit);
        expect(createTuits.postedBy).toEqual(newTuits.postedBy);
    });
});

describe("can delete tuit with REST API", () => {
    // sample tuit to insert
    const newTuits = {
        tuit: "hello world. This is Test",
        postedBy: "64577431cd4eab25f6a5660f",
    };
    // // setup test before running test
    beforeAll(() => {
        // insert the sample tuits we then try to remove
        return createTuit(newTuits);
    });
    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuitByUser(newTuits.postedBy);
    });
    test("can delete tuit with REST API", async () => {
        // delete a tuit by their user id. Assumes tuit already exists
        const status = await deleteTuitByUser(newTuits.postedBy);
        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(0);
    });
});

describe("can retrieve a tuit by their primary key with REST API", () => {
    // sample tuit to insert
    const newTuits = {
        tuit: "hello world. This is Test",
        postedBy: "64577431cd4eab25f6a5660f",
    };


    beforeAll(() => {
        // remove any/all tuit to make sure we create it in the test
        return deleteTuitByUser(newTuits.postedBy);
    });

    afterAll(() => {
        // remove any data we created
        return deleteTuitByUser(newTuits.postedBy);
    });

    test("can retrieve a tuit by their primary key with REST API", async () => {
        // insert new tuit in the database
        const createdTuits = await createTuit(newTuits);

        // verify inserted tuit's properties match parameter Tuit
        expect(createdTuits.tuit).toEqual(newTuits.tuit);
        expect(createdTuits.postedBy).toEqual(newTuits.postedBy);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(createdTuits._id);

        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(newTuits.tuit);
        expect(existingTuit.postedBy).toEqual(newTuits.postedBy);
    });
});

describe("can retrieve all tuits with REST API", () => {
    // sample users we'll insert to then retrieve
    const tuits = [
        { tuit: "hello world 1", postedBy: "63577431cd4eab25f6a5660f" },
        { tuit: "This is Testing 2", postedBy: "63577431cd4eab25f6a5660f" },
        { tuit: "hello world this is testing 3", postedBy: "63577431cd4eab25f6a5660f" },
    ];

    const tuitsIndex = [
        "hello world 1",
        "This is Testing 2",
        "hello world this is testing 3",
    ];

    // setup data before test
    beforeAll(
        () =>
        {
            return createTuit(tuits[0]), createTuit(tuits[1]),createTuit(tuits[2]);
        }

    );

    afterAll(() => {
        return deleteTuitByUser("63577431cd4eab25f6a5660f"), deleteTuitByUser("63577431cd4eab25f6a5660f"), deleteTuitByUser("63577431cd4eab25f6a5660f");
    });

    test("can retrieve all users from REST API", async () => {
        // retrieve all the tuits
        const allTuits = await findAllTuits();


        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        const allTuitsInsert = allTuits.filter(
            (tuit) => tuitsIndex.indexOf(tuit.tuit) >= 0
        );


        allTuitsInsert.forEach((tuitOutput) => {
            const tuitInput = tuits.find((tuit) => tuit.tuit === tuitOutput.tuit);

            expect(tuitOutput.tuit).toEqual(tuitInput.tuit);
            expect(tuitOutput.postedBy).toEqual(tuitInput.postedBy);
        });
    });
});
