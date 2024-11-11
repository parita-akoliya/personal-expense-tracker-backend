"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(entity, dataSource) {
        this.repository = dataSource.getRepository(entity);
    }
    // Create a new entity
    create(entityData) {
        return this.repository.create(entityData);
    }
    // Save an entity to the database
    async save(entity) {
        return this.repository.save(entity);
    }
    // Find entities based on options
    find(options) {
        return this.repository.find(options);
    }
    // Find a single entity by ID
    findOne(criteria, options) {
        if (typeof criteria === "number") {
            return this.repository.findOne({
                where: { id: criteria },
                ...options,
            });
        }
        return this.repository.findOne({ where: criteria, ...options });
    }
    // Update an entity
    async update(id, entityData) {
        await this.repository.update(id, entityData);
        return this.findOne(id);
    }
    // Delete an entity by ID
    async delete(id) {
        await this.repository.delete(id);
    }
    // Count entities
    count(options) {
        return this.repository.count(options);
    }
    // Execute a stored procedure
    async executeProcedure(procedureName, params) {
        const query = `CALL ${procedureName}(${params.map(() => "?").join(", ")})`;
        return this.repository.query(query, params);
    }
    // General query function
    async query(queryString, parameters) {
        return this.repository.query(queryString, parameters);
    }
}
exports.BaseRepository = BaseRepository;
