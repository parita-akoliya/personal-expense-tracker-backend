import { Repository, DataSource, ObjectLiteral, DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

/**
 * Abstract base repository class providing common data access methods.
 */
export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(entity: { new (): T }, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity);
  }

  /**
   * Creates a new entity instance.
   * 
   * @param entityData - The data to create the entity with.
   * @returns The created entity instance.
   */
  create(entityData: DeepPartial<T>): T {
    return this.repository.create(entityData);
  }

  /**
   * Saves an entity to the database.
   * 
   * @param entity - The entity to save.
   * @returns A promise that resolves to the saved entity.
   */
  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  /**
   * Finds entities based on options.
   * 
   * @param options - The options to use for the query.
   * @returns A promise that resolves to an array of found entities.
   */
  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  /**
   * Finds a single entity by criteria.
   * 
   * @param criteria - The criteria to find the entity by.
   * @param options - Additional options for the query.
   * @returns A promise that resolves to the found entity or null.
   */
  findOne(criteria: number | FindOptionsWhere<T>, options?: FindOneOptions<T>): Promise<T | null> {
    if (typeof criteria === 'number') {
      return this.repository.findOne({ where: { id: criteria } as any, ...options });
    }
    return this.repository.findOne({ where: criteria, ...options });
  }

  /**
   * Updates an entity by ID.
   * 
   * @param id - The ID of the entity to update.
   * @param entityData - The data to update the entity with.
   * @returns A promise that resolves to the updated entity or null.
   */
  async update(id: number, entityData: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, entityData as any);
    return this.findOne(id);
  }

  /**
   * Deletes an entity by ID.
   * 
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves when the entity is deleted.
   */
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Counts entities based on options.
   * 
   * @param options - The options to use for the count query.
   * @returns A promise that resolves to the count of entities.
   */
  count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  /**
   * Executes a stored procedure.
   * 
   * @param procedureName - The name of the procedure to execute.
   * @param params - The parameters for the procedure.
   * @returns A promise that resolves to the result of the procedure.
   */
  async executeProcedure(procedureName: string, params: any[]): Promise<any> {
    const query = `CALL ${procedureName}(${params.map(() => '?').join(', ')})`;
    return this.repository.query(query, params);
  }

  /**
   * Executes a raw SQL query.
   * 
   * @param queryString - The query string to execute.
   * @param parameters - The parameters for the query.
   * @returns A promise that resolves to the result of the query.
   */
  async query(queryString: string, parameters?: any[]): Promise<any> {
    return this.repository.query(queryString, parameters);
  }
}