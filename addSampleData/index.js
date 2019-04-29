const admin = require('../node_modules/firebase-admin');
const faker = require('faker');
const serviceAccount = require("../keys.json");
const collectionKey = ["users", "organisations", "spaces", "threads", "comments"]; //name of the collection
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://labseu1-db-test.firebaseio.com"
// });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://labseu1-db-test2.firebaseio.com"
});
const uuid = require('uuid');
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

class User {
    constructor(props) {
        this.fullName = faker.name.firstName() + ' ' + faker.name.lastName(),
            this.profileUrl = faker.image.imageUrl(),
            this.userEmail = faker.internet.email(),
            this.arrayOfOrgs = props.arrayOfOrgs,
            this.arrayOfSpaceIds = props.arrayOfSpaceIds,
            this.arrayOfSpaceNames = props.arrayOfSpaceNames,
            this.userId = faker.random.number()
    }
}

class Organisation {
    constructor(props) {
        this.arrayOfAdmins = props.arrayOfAdmins,
            this.arrayOfUsers = props.arrayOfUsers,
            this.createdByUserId = props.createdByUserId,
            this.isPremium = faker.random.boolean(),
            this.orgId = props.orgId,
            this.orgMission = faker.company.catchPhrase(),
            this.orgName = props.orgName,
            this.orgUrl = faker.internet.url()
    }
}

class Space {
    constructor(props) {
        this.arrayOfUserIdsInSpace = props.arrayOfUserIdsInSpace,
            this.orgId = props.orgId,
            this.spaceCreatedByUserId = props.spaceCreatedByUserId,
            this.spaceId = props.spaceId,
            this.spaceName = props.spaceName
    }
}

class Thread {
    constructor(props) {
        this.orgId = props.orgId,
            this.spaceId = props.spaceId,
            this.threadCreatedAt = faker.date.past(),
            this.threadCreatedByUserId = props.threadCreatedByUserId,
            this.threadCreatedByUserName = props.threadCreatedByUserName,
            this.threadName = faker.commerce.department(),
            this.threadTopic = faker.lorem.words(),
            this.threadId = faker.random.number()
    }
}

class Comment {
    constructor(props) {
        this.arrayOfUserIdsWhoLiked = props.arrayOfUserIdsWhoLiked,
            this.commentBody = faker.lorem.text(),
            this.commentCreatedAt = faker.date.past(),
            this.commentCreatedByUserName = props.commentCreatedByUserName,
            this.commentId = faker.random.number(),
            this.isCommentDecided = faker.random.boolean(),
            this.orgId = props.orgId,
            this.orgName = props.orgName,
            this.threadId = props.threadId,
            this.threadName = props.threadName
    }
}

module.exports = {
    User,
    Organisation,
    Space,
    Thread,
    Comment
}

for (let i = 0; i < 51; i++) {
    const user1Id = uuid();
    const user2Id = uuid();
    const user3Id = uuid();
    const user4Id = uuid();
    const user5Id = uuid();

    const org1Id = uuid();


    const space1Id = uuid();
    const space2Id = uuid();
    const space3Id = uuid();
    const space4Id = uuid();

    const thread1Id = uuid();
    const thread2Id = uuid();
    const thread3Id = uuid();
    const thread4Id = uuid();
    const thread5Id = uuid();

    const comment1Id = uuid();
    const comment2Id = uuid();
    const comment3Id = uuid();
    const comment4Id = uuid();
    const comment5Id = uuid();

    const arrayOfOrgs = [{isAdmin: faker.random.boolean(), orgId: org1Id, orgName: faker.company.companyName()}];
    const arrayOfSpaceNames = [`${faker.commerce.department()}`, `${faker.commerce.department()}`, `${faker.commerce.department()}`, `${faker.commerce.department()}`];
    const arrayOfSpaceIds = [space1Id, space2Id, space3Id, space4Id];

    const userIds = [user1Id, user2Id, user3Id, user4Id, user5Id];
    const spacesId = [space1Id, space2Id, space3Id, space4Id];
    const threadsId = [thread1Id, thread2Id, thread3Id, thread4Id, thread5Id];
    const commentsId = [comment1Id, comment2Id, comment3Id, comment4Id, comment5Id];

    const user1 = new User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
    const user2 = new User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
    const user3 = new User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
    const user4 = new User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
    const user5 = new User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
    const organisation1 = new Organisation({arrayOfAdmins: [
        {userEmail: user1.userEmail, userId: user1Id},
        {userEmail: user2.userEmail, userId: user2Id},
        {userEmail: user3.userEmail, userId: user3Id}],
        arrayOfUsers: [
            {userEmail: user4.userEmail, userId: user4Id},
            {userEmail: user5.userEmail, userId: user5Id}],
        createdByUserId: user1.userId,
        orgId: arrayOfOrgs[0].orgId,
        orgName: arrayOfOrgs[0].orgName
        })
    const space1 = new Space({
        arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
        orgId: org1Id,
        spaceCreatedByUserId: user2.userId,
        spaceName: arrayOfSpaceNames[0],
        spaceId: arrayOfSpaceIds[0]
    })
    const space2 = new Space({
        arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
        orgId: org1Id,
        spaceCreatedByUserId: user1.userId,
        spaceName: arrayOfSpaceNames[1],
        spaceId: arrayOfSpaceIds[1]
    })
    const space3 = new Space({
        arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
        orgId: org1Id,
        spaceCreatedByUserId: user3.userId,
        spaceName: arrayOfSpaceNames[2],
        spaceId: arrayOfSpaceIds[2]
    })
    const space4 = new Space({
        arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
        orgId: org1Id,
        spaceCreatedByUserId: user3.userId,
        spaceName: arrayOfSpaceNames[3],
        spaceId: arrayOfSpaceIds[3]
    })
    const thread1 = new Thread({
        orgId: org1Id,
        spaceId: space1Id,
        threadCreatedByUserId: user4Id,
        threadCreatedByUserName: user4.fullName
    })
    const thread2 = new Thread({
        orgId: org1Id,
        spaceId: space1Id,
        threadCreatedByUserId: user5Id,
        threadCreatedByUserName: user5.fullName
    })
    const thread3 = new Thread({
        orgId: organisation1.orgId,
        spaceId: space2Id,
        threadCreatedByUserId: user1Id,
        threadCreatedByUserName: user1.fullName
    })
    const thread4 = new Thread({
        orgId: org1Id,
        spaceId: space3Id,
        threadCreatedByUserId: user2Id,
        threadCreatedByUserName: user2.fullName
    })
    const thread5 = new Thread({
        orgId: org1Id,
        spaceId: space4Id,
        threadCreatedByUserId: user3Id,
        threadCreatedByUserName: user3.fullName
    })
    const comment1 = new Comment({
        arrayOfUserIdsWhoLiked: [user1Id],
        commentCreatedByUserName: user2.fullName,
        orgId: org1Id,
        orgName: organisation1.orgName,
        threadId: thread1Id,
        threadName: thread1.threadName
    })
    const comment2 = new Comment({
        arrayOfUserIdsWhoLiked: [user1Id],
        commentCreatedByUserName: user2.fullName,
        orgId: org1Id,
        orgName: organisation1.orgName,
        threadId: thread2Id,
        threadName: thread2.threadName
    })
    const comment3 = new Comment({
        arrayOfUserIdsWhoLiked: [user3Id],
        commentCreatedByUserName: user4.fullName,
        orgId: org1Id,
        orgName: organisation1.orgName,
        threadId: thread5Id,
        threadName: thread5.threadName
    })
    const comment4 = new Comment({
        arrayOfUserIdsWhoLiked: [user4Id],
        commentCreatedByUserName: user1.fullName,
        orgId: org1Id,
        orgName: organisation1.orgName,
        threadId: thread3Id,
        threadName: thread3.threadName
    })
    const comment5 = new Comment({
        arrayOfUserIdsWhoLiked: [user5Id],
        commentCreatedByUserName: user4.fullName,
        orgId: org1Id,
        orgName: organisation1.orgName,
        threadId: thread4Id,
        threadName: thread4.threadName
    })

    const users = [user1, user2, user3, user4, user5];
    const spaces = [space1, space2, space3, space4];
    const threads = [thread1, thread2, thread3, thread4, thread5];
    const comments = [comment1, comment2, comment3, comment4, comment5];

    // console.log(users);
    // console.log(spaces);
    // console.log(threads);
    // console.log(comments);
    // console.log(organisation1);


    for (let i = 0; i < users.length; i++) {
        firestore.collection(collectionKey[0]).doc(userIds[i]).set(Object.assign({}, users[i])).then((res) => {
        console.log("Document " + res.id + " successfully written!");
        }).catch((error) => {
        console.error("Error writing document: ", error);
        });
        console.log(i);
    }

    for (let i = 0; i < spaces.length; i++) {
        firestore.collection(collectionKey[2]).doc(spacesId[i]).set(Object.assign({}, spaces[i])).then((res) => {
        console.log("Document " + res.id + " successfully written!");
        }).catch((error) => {
        console.error("Error writing document: ", error);
        });
    }

    for (let i = 0; i < threads.length; i++) {
        firestore.collection(collectionKey[3]).doc(threadsId[i]).set(Object.assign({}, threads[i])).then((res) => {
        console.log("Document " + res.id + " successfully written!");
        }).catch((error) => {
        console.error("Error writing document: ", error);
        });
    }

    for (let i = 0; i < comments.length; i++) {
        firestore.collection(collectionKey[4]).doc(commentsId[i]).set(Object.assign({}, comments[i])).then((res) => {
        console.log("Document " + res.id + " successfully written!");
        }).catch((error) => {
        console.error("Error writing document: ", error);
        });
    }

    firestore.collection(collectionKey[1]).doc(org1Id).set(Object.assign({}, organisation1)).then((res) => {
    console.log("Document " + res.id + " successfully written!");
    }).catch((error) => {
    console.error("Error writing document: ", error);
    });
}


