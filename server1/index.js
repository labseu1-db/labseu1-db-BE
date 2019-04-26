const admin = require('./node_modules/firebase-admin');
const faker = require('faker');
const serviceAccount = require("./labseu1-db-test-firebase-adminsdk-1jm38-e35b662552.json");
const collectionKey = "users"; //name of the collection
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://labseu1-db-test.firebaseio.com"
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const user = {
    fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
    profileUrl: faker.image.imageUrl(),
    userEmail: faker.internet.email(),
    arrayOfOrgs: [{ isAdmin: faker.random.boolean(), orgId: faker.random.number(), orgName: faker.company.companyName() }],
    arrayOfSpaceIds: [faker.random.number()],
    arrayOfSpaceNames: []
}

firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
    console.log("Document " + docKey + " successfully written!");
}).catch((error) => {
    console.error("Error writing document: ", error);
});


