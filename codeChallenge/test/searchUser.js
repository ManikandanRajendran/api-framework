import { describe } from 'mocha';
import supertest from 'supertest';
import { expect } from 'chai';
import * as validator from 'email-validator';

const request = supertest('https://jsonplaceholder.typicode.com/');
const userName = 'Delphine';



describe('searchUsers', () => {
    let userId = null;
    let postsId = [];


    it(`GET on search user with username ${userName}`, () => {
        return request.get(`users?username=${userName}`).then((res) =>{
            expect(res.body).to.not.be.empty;
            expect(res.statusCode).to.be.eql(200);
            userId = res.body[0].id;
        })
    });

    it(`GET on search posts with user id ${userId}`, () => {
        return request.get(`posts?userId=${userId}`).then((res) =>{
            expect(res.body).to.not.be.empty;
            expect(res.statusCode).to.be.eql(200);
            res.body.forEach(value => {
                let id = value.id
                postsId.push(id);
            });
        });        
    });

    it(`GET search the comments with postId`,()=>{
        postsId.forEach(value =>{
            return request.get(`comments?postId=${value}`).then((res)=>{
                expect(res.body).to.not.be.empty;
                expect(res.statusCode).to.be.eql(200);
                res.body.forEach(emailValue => {
                    expect(validator.validate(emailValue['email'])).to.be.true;
                });
            })
        })
        
    });
})