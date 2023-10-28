interface ServiceManager {
  /**
   * Add a service
   *
   * @param s the symbol used to lookup the service
   * @param service the service to add
   */
  add(s: symbol, service: {}): void;

  /**
   * Get a service
   *
   * @param s the symbol used to lookup the service
   * @returns the service
   */
  get<T extends {}>(s: symbol): T;
}

class ServiceManagerInternal implements ServiceManager {
  private services = new Map<symbol, {}>();

  /**
   * Add a service
   *
   * @param s the symbol used to lookup the service
   * @param service the service to add
   */
  public add(s: symbol, service: {}): void {
    this.services.set(s, service);
  }

  /**
   * Get a service
   *
   * @param s the symbol used to lookup the service
   * @returns the service
   */
  public get<T extends {}>(s: symbol): T {
    const service = this.services.get(s);
    if (!service) {
      throw new Error(`Service ${s.toString()} not found`);
    }

    return service as T;
  }
}

export const GameServiceManager = ServiceManagerInternal;

/**
 * ServiceManager is a singleton that holds all services
 */
export const ServiceManager = new ServiceManagerInternal();
