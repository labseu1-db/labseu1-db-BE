const components = require('./index.js');
const faker = require('faker');
const uuid = require('uuid');

describe('test components', () => {
    describe('take snapshots', () => {
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

        const user1 = new components.User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
        const user2 = new components.User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
        const user3 = new components.User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
        const user4 = new components.User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});
        const user5 = new components.User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds});

    const organisation1 = new components.Organisation({arrayOfAdmins: [
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

    const thread1 = new components.Thread({
        orgId: org1Id,
        spaceId: space1Id,
        threadCreatedByUserId: user4Id,
        threadCreatedByUserName: user4.fullName
    })

        it('User snapshot', () => {
            expect(new components.User({arrayOfOrgs, arrayOfSpaceNames, arrayOfSpaceIds})).toMatchSnapshot()
        });
        it('Organisation snapshot', () => {
            expect(new components.Organisation({arrayOfAdmins: [
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
            ).toMatchSnapshot();
        })
        it('Space snapshot', () => {
            expect(new components.Space({
                arrayOfUserIdsInSpace: [user1Id, user2Id, user3Id, user4Id, user5Id],
                orgId: org1Id,
                spaceCreatedByUserId: user2.userId,
                spaceName: arrayOfSpaceNames[0],
                spaceId: arrayOfSpaceIds[0]
            })).toMatchSnapshot();
        })
        it('Thread snapshot', () => {
            expect(new components.Thread({
                orgId: org1Id,
                spaceId: space1Id,
                threadCreatedByUserId: user4Id,
                threadCreatedByUserName: user4.fullName
            })).toMatchSnapshot();
        })
        it('Comment Snapshot', () => {
            expect(new components.Comment({
                arrayOfUserIdsWhoLiked: [user1Id],
                commentCreatedByUserName: user2.fullName,
                orgId: org1Id,
                orgName: organisation1.orgName,
                threadId: thread1Id,
                threadName: thread1.threadName
            })).toMatchSnapshot();
        })
    })
})