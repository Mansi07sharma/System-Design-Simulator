import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
    "nodes": Array,
    "edges": Array,
    "rps" :{type: Number, default: 0},
    "slaLatency" : {type: Number, default: 0},
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now },
    "email": String,
    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "components": { type: Number, default: 0 },
    "thumbnail": { type: String, default: "https://www.crio.do/blog/content/images/2023/08/A-Comprehensive-Guide-to-System-Design.png" }
})

const Design = mongoose.model('Design', designSchema);
export default Design;