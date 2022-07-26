import HttpStatus from 'http-status-codes';
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

let loginToken;
let noteid;
import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }
    done();
  });
  // User registration

  describe('User', () => {
    it('Successfull registration should return status 201', (done) => {
      const userdetails = {
        firstName: 'Arpan',
        lastName: 'Suji',
        email: 'arpanap102@gmail.com',
        password: 'arpan2807'
      };
      request(app)
        .post('/api/v1/users/signUp')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });


  it('Unsuccessfull registration should return status 400', (done) => {
    const userdetails = {
      firstName: "11111111111",
      lastName: "222222222",
      email: "33333333333",
      password: "44444444444"
    };
    request(app)
      .post('/api/v1/users/signUp')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
  });


  // User login

  describe('User', () => {
    it('given user login should return status 200', (done) => {
      const userdetails = {
        email: 'arpanap102@gmail.com',
        password: 'arpan2807'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          loginToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


    it('given user unsuccessfull login should return status 400', (done) => {
      const userdetails = {
        email: 'as@gmail.c',
        password: 'as@123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });

    });

  });

  // // Forget password

  // describe('User', () => {
  //   it('Forget password should return status 200', (done) => {
  //     const userdetails = {
  //       email: 'arpanap102@gmail.com'
  //     };
  //     request(app)
  //       .post('/api/v1/users/forgetPassword')
  //       .send(userdetails)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(HttpStatus.OK);        
  //       });
  //       done();
  //   });

  // // Forget password

  //   it('Forget password unsuccessfull login should return status 400', (done) => {
  //     const userdetails = {
  //       email: 'aaaa@gmail.com'
  //     };
  //     request(app)
  //       .post('/api/v1/users/forgetPassword')
  //       .send(userdetails)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
  //       });
  //       done();
  //   }); 
  // });


  // // Create New Note

  describe('Note', () => {
    it('Create note should return status 200', (done) => {
      const userdetails = {
        Title: 'This is A Test Title',
        Description: 'This is a test description',
        Color: 'Red'
      };
      request(app)
        .post('/api/v1/userNotes/')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(userdetails)
        .end((err, res) => {
          noteid = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });

    });


    it('Create New Note authentication failed  should return status 400', (done) => {
      const userdetails = {
        Title: 'This is A Test Title',
        Description: 'This is a test description',
        Color: 'Red'
      };
      request(app)
        .post('/api/v1/userNotes/')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });

    });

  });

  // // get all note

  describe('Note', () => {
    it('get all note should return status 200', (done) => {
      const userdetails = {};
      request(app)
        .get('/api/v1/userNotes/')
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });

    });

    
    it('get all note authentication failed should return status 400', (done) => {
      const userdetails = {};
      request(app)
        .get('/api/v1/userNotes/')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });

    });

  });

  // //get one note 

  describe('Note', () => {
    it('get single note by note id should return status 200 ', (done) => {
      const userdetails = {};
      request(app)
        .get(`/api/v1/userNotes/${noteid}`)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });

    });


    it('get single note authentication failed should return status 400', (done) => {
      const userdetails = {};
      request(app)
        .get(`/api/v1/userNotes/${noteid}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });

    });

  });

  // //update note

  describe('Note', () => {
    it('update note by note id should return status 200 ', (done) => {
      const userdetails = {
        Title: 'This is the test title',
        Description: 'This is the test description',
        Color: 'Blue'
      };
      request(app)
        .put(`/api/v1/userNotes/${noteid}`)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });

    });

    
    it('update note authentication failed should return status 400', (done) => {
      const userdetails = {
        Title: 'This is the test title',
        Description: 'This is the test description',
        Color: 'Blue'
      };
      request(app)
        .put(`/api/v1/userNotes/${noteid}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });

    });

  });

  // // Delete Note

  describe('Note', () => {
    it('Delete note by note id should return status 200 ', (done) => {
      const userdetails = { };
      request(app)
        .delete(`/api/v1/userNotes/${noteid}`)
        .set('Authorization', `Bearer ${loginToken}`) 
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });

  it('Delete note authentication failed should return status 400', (done) => {
    const userdetails = { };
    request(app)
      .delete(`/api/v1/userNotes/${noteid}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
   });


  // // Archive Note

  describe('Note', () => {
    it('Archive Note by note id should return status 200 ', (done) => {
      const userdetails = { };
      request(app)
        .put(`/api/v1/userNotes/${noteid}/isArchive`)
        .set('Authorization', `Bearer ${loginToken}`) 
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });


  it('Archive Note authentication failed should return status 400', (done) => {
    const userdetails = { };
    request(app)
      .put(`/api/v1/userNotes/${noteid}/isArchive`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
   });


  // // Move to trash Note

  describe('Note', () => {
    it('Move to trash by note id should return status 200 ', (done) => {
      const userdetails = { };
      request(app)
        .put(`/api/v1/userNotes/${noteid}/isDelete`)
        .set('Authorization', `Bearer ${loginToken}`) 
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


  it('Move to trash by note id authentication failed should return status 400', (done) => {
    const userdetails = { };
    request(app)
      .put(`/api/v1/userNotes/${noteid}/isDelete`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
   });
});