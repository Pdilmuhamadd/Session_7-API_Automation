import fetch from "node-fetch";
import {expect} from "chai";
import Ajv from "ajv";
import { schema_createuser, schema_getuser } from "../schema/reqresSchema.js";

describe("API Tests Suite", function(){
    const baseURL = "https://reqres.in";

    // GET
    it("READ - Get Single User", async function(){
        const response = await fetch(`${baseURL}/api/users?page=2`,{
            method:"GET",
            headers:{
                "x-api-key":"reqres_6f7e67c8dd9d47fe91502d3adcf24a46"
            }
        })
        
        expect(response.status).to.equal(200);

        const ajv = new Ajv();
        const data = await response.json();
        const cek = ajv.compile(schema_getuser);
        const hasil = cek(data);

        expect(hasil, "Validasi JSON Schema GET ada yang salah").to.be.true;
    });

    // POST
    it("CREATE - Create User Baru", async function(){
        const newPost = {
            name: "Pratama",
            job: "Software Engineer"
        }

        const response = await fetch(`${baseURL}/api/users`,{
            method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "x-api-key":"reqres_6f7e67c8dd9d47fe91502d3adcf24a46"
                },
                body: JSON.stringify(newPost)
        })

        expect(response.status).to.equal(201)

        // validasi JSON Schema
        const ajv = new Ajv()
        const data = await response.json()
        const cek = ajv.compile(schema_createuser)
        const hasil = cek(data)

        expect(hasil, "Validasi JSON Schema POST ada yang salah").to.be.true
    })
})