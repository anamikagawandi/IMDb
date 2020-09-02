"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
chai.use(chaiHttp);
const app = require("../app");
let requester = null;

describe('Movie', () => {
    describe('Positive', () => {
        it('should list movies, 10 by default', () => {
            app.getApp().then(async (res)=>{
                // console.log(res)
                requester = await chai.request(res).keepOpen();
                chai.request(res).get("/imdb/movie")
                .then((response) => {
                    // console.log(response)
                    expect(response).to.have.status(200);
                    expect(response).to.be.json;
                    // expect(res.body.count).to.be.an("string");
                    // expect(response).should.have.property("count");
                })
                .catch((err) => {
                    throw err;
                });
            })
        });
        // it('should return sum', () => {
        //     expect(sum.add(-1, 2)).to.equal(1)
        // });
        // it('should return sum', () => {
        //     expect(sum.add(2.3, 4)).to.equal(6.3)
        // });
        // it('should return sum', () => {
        //     expect(sum.add(-1, -2)).to.equal(-3)
        // });
    });
    // describe('Add 2 numbers error', () => {
    //     it('should return error', () => {
    //         expect(() => sum.add(null, null)).to.throw('Invalid input');
    //     });
    // });
});

// const requester = chai.request(app).keepOpen()
 
// Promise.all([
//   requester.get('/'),
// //   requester.get('/b'),
// ])
// .then(responses => console.log(responses))
// .then(() => requester.close())

