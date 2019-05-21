const admin = require("../node_modules/firebase-admin");
const faker = require("faker");
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
const uuid = require("uuid");
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

class User {
  constructor(props) {
    (this.fullName = faker.name.firstName() + " " + faker.name.lastName()),
      (this.profileUrl = faker.image.imageUrl()),
      (this.userEmail = faker.internet.email()),
      (this.arrayOfOrgsIds = props.arrayOfOrgsIds),
      (this.arrayOfOrgsNames = props.arrayOfOrgsNames),
      (this.arrayOfSpaceIds = props.arrayOfSpaceIds);
  }
}

class Organisation {
  constructor(props) {
    (this.arrayOfAdminsEmails = props.arrayOfAdminsEmails),
      (this.arrayOfAdminsIds = props.arrayOfAdminsIds),
      (this.arrayOfUsersIds = props.arrayOfUsersIds),
      (this.arrayOfUsersEmails = props.arrayOfUsersEmails),
      (this.createdByUserId = props.createdByUserId),
      (this.isPremium = faker.random.boolean()),
      (this.orgName = props.orgName);
  }
}

class Space {
  constructor(props) {
    (this.arrayOfUserIdsInSpace = props.arrayOfUserIdsInSpace),
      (this.orgId = props.orgId),
      (this.spaceCreatedByUserId = props.spaceCreatedByUserId),
      (this.spaceName = props.spaceName);
    this.spaceTopic = faker.lorem.words();
  }
}

class Thread {
  constructor(props) {
    (this.orgId = props.orgId),
      (this.spaceId = props.spaceId),
      (this.threadCreatedAt = faker.date.past()),
      (this.threadCreatedByUserId = props.threadCreatedByUserId),
      (this.threadCreatedByUserName = props.threadCreatedByUserName),
      (this.threadName = faker.commerce.department()),
      (this.threadTopic = faker.lorem.words());
  }
}

class Comment {
  constructor(props) {
    (this.arrayOfUserIdsWhoLiked = props.arrayOfUserIdsWhoLiked),
      (this.commentBody = faker.lorem.text()),
      (this.commentCreatedAt = faker.date.past()),
      (this.commentCreatedByUserName = props.commentCreatedByUserName),
      (this.commentCreatedByUserId = props.commentCreatedByUserId),
      (this.isCommentDecided = faker.random.boolean()),
      (this.orgId = props.orgId),
      (this.orgName = props.orgName),
      (this.threadId = props.threadId),
      (this.threadName = props.threadName);
  }
}

module.exports = {
  User,
  Organisation,
  Space,
  Thread,
  Comment
};

for (let i = 0; i < 11; i++) {
  const user1Id = uuid();
  const user2Id = uuid();
  const user3Id = uuid();
  const user4Id = uuid();
  const user5Id = uuid();

  const org1Id = uuid();
  const org2Id = uuid();

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

  const arrayOfOrgsNames = [faker.company.companyName(), faker.company.companyName()];
  const arrayOfSpaceNames = [
    `${faker.commerce.department()}`,
    `${faker.commerce.department()}`,
    `${faker.commerce.department()}`,
    `${faker.commerce.department()}`
  ];
  const arrayOfSpaceIds = [space1Id, space2Id, space3Id, space4Id];

  const userIds = [user1Id, user2Id, user3Id, user4Id, user5Id];
  const spacesId = [space1Id, space2Id, space3Id, space4Id];
  const threadsId = [thread1Id, thread2Id, thread3Id, thread4Id, thread5Id];
  const commentsId = [comment1Id, comment2Id, comment3Id, comment4Id, comment5Id];
  const orgIds = [org1Id, org2Id];

  const user1 = new User({ arrayOfOrgsIds: orgIds, arrayOfOrgsNames, arrayOfSpaceIds });
  const user2 = new User({ arrayOfOrgsIds: orgIds, arrayOfOrgsNames, arrayOfSpaceIds });
  const user3 = new User({ arrayOfOrgsIds: orgIds, arrayOfOrgsNames, arrayOfSpaceIds });
  const user4 = new User({ arrayOfOrgsIds: orgIds, arrayOfOrgsNames, arrayOfSpaceIds });
  const user5 = new User({ arrayOfOrgsIds: orgIds, arrayOfOrgsNames, arrayOfSpaceIds });
  const organisation1 = new Organisation({
    arrayOfAdminsEmails: [user1.userEmail, user2.userEmail, user3.userEmail],
    arrayOfAdminsIds: [user1Id, user2Id, user3Id],
    arrayOfUsersEmails: [user1.userEmail, user2.userEmail, user3.userEmail, user4.userEmail, user5.userEmail],
    arrayOfUsersIds: userIds,
    createdByUserId: user1Id,
    orgId: org1Id,
    orgName: arrayOfOrgsNames[0]
  });
  const organisation2 = new Organisation({
    arrayOfAdminsEmails: [user1.userEmail, user2.userEmail, user3.userEmail],
    arrayOfAdminsIds: [user1Id, user2Id, user3Id],
    arrayOfUsersEmails: [user1.userEmail, user2.userEmail, user3.userEmail, user4.userEmail, user5.userEmail],
    arrayOfUsersIds: userIds,
    createdByUserId: user2Id,
    orgId: org2Id,
    orgName: arrayOfOrgsNames[1]
  });
  const space1 = new Space({
    arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
    orgId: org1Id,
    spaceCreatedByUserId: user2Id,
    spaceName: arrayOfSpaceNames[0]
  });
  const space2 = new Space({
    arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
    orgId: org2Id,
    spaceCreatedByUserId: user1Id,
    spaceName: arrayOfSpaceNames[1]
  });
  const space3 = new Space({
    arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
    orgId: org1Id,
    spaceCreatedByUserId: user3Id,
    spaceName: arrayOfSpaceNames[2]
  });
  const space4 = new Space({
    arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
    orgId: org2Id,
    spaceCreatedByUserId: user3Id,
    spaceName: arrayOfSpaceNames[3]
  });
  const thread1 = new Thread({
    orgId: org1Id,
    spaceId: space1Id,
    threadCreatedByUserId: user4Id,
    threadCreatedByUserName: user4.fullName
  });
  const thread2 = new Thread({
    orgId: org2Id,
    spaceId: space1Id,
    threadCreatedByUserId: user5Id,
    threadCreatedByUserName: user5.fullName
  });
  const thread3 = new Thread({
    orgId: org2Id,
    spaceId: space2Id,
    threadCreatedByUserId: user1Id,
    threadCreatedByUserName: user1.fullName
  });
  const thread4 = new Thread({
    orgId: org1Id,
    spaceId: space3Id,
    threadCreatedByUserId: user2Id,
    threadCreatedByUserName: user2.fullName
  });
  const thread5 = new Thread({
    orgId: org2Id,
    spaceId: space4Id,
    threadCreatedByUserId: user3Id,
    threadCreatedByUserName: user3.fullName
  });
  const comment1 = new Comment({
    arrayOfUserIdsWhoLiked: [user1Id],
    commentCreatedByUserName: user2.fullName,
    commentCreatedByUserId: user2Id,
    orgId: org1Id,
    orgName: organisation1.orgName,
    threadId: thread1Id,
    threadName: thread1.threadName
  });
  const comment2 = new Comment({
    arrayOfUserIdsWhoLiked: [user1Id],
    commentCreatedByUserName: user2.fullName,
    commentCreatedByUserId: user2Id,
    orgId: org1Id,
    orgName: organisation1.orgName,
    threadId: thread2Id,
    threadName: thread2.threadName
  });
  const comment3 = new Comment({
    arrayOfUserIdsWhoLiked: [user3Id],
    commentCreatedByUserName: user4.fullName,
    commentCreatedByUserId: user4Id,
    orgId: org1Id,
    orgName: organisation1.orgName,
    threadId: thread5Id,
    threadName: thread5.threadName
  });
  const comment4 = new Comment({
    arrayOfUserIdsWhoLiked: [user4Id],
    commentCreatedByUserName: user1.fullName,
    commentCreatedByUserId: user1Id,
    orgId: org1Id,
    orgName: organisation1.orgName,
    threadId: thread3Id,
    threadName: thread3.threadName
  });
  const comment5 = new Comment({
    arrayOfUserIdsWhoLiked: [user5Id],
    commentCreatedByUserName: user4.fullName,
    commentCreatedByUserId: user4Id,
    orgId: org1Id,
    orgName: organisation1.orgName,
    threadId: thread4Id,
    threadName: thread4.threadName
  });

  const users = [user1, user2, user3, user4, user5];
  const spaces = [space1, space2, space3, space4];
  const threads = [thread1, thread2, thread3, thread4, thread5];
  const comments = [comment1, comment2, comment3, comment4, comment5];
  const organisations = [organisation1, organisation2];

  // console.log(space1, "<============================ org1");
  // console.log(organisation2, "<============================ org2");
  // console.log(organisations);
  // console.log(comment1);

  for (let i = 0; i < users.length; i++) {
    firestore
      .collection(collectionKey[0])
      .doc(userIds[i])
      .set(Object.assign({}, users[i]))
      .then(res => {
        console.log("Document " + res.id + " successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  for (let i = 0; i < spaces.length; i++) {
    firestore
      .collection(collectionKey[2])
      .doc(spacesId[i])
      .set(Object.assign({}, spaces[i]))
      .then(res => {
        console.log("Document " + res.id + " successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  for (let i = 0; i < threads.length; i++) {
    firestore
      .collection(collectionKey[3])
      .doc(threadsId[i])
      .set(Object.assign({}, threads[i]))
      .then(res => {
        console.log("Document " + res.id + " successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  for (let i = 0; i < comments.length; i++) {
    firestore
      .collection(collectionKey[4])
      .doc(commentsId[i])
      .set(Object.assign({}, comments[i]))
      .then(res => {
        console.log("Document " + res.id + " successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  for (let i = 0; i < organisations.length; i++) {
    firestore
      .collection(collectionKey[1])
      .doc(orgIds[i])
      .set(Object.assign({}, organisations[i]))
      .then(res => {
        console.log("Document " + res.id + " successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }
}
