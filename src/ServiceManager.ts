/**
 * Manages services
 *
 * Services help to decouple code. Use them sparingly to provide low-level functionality to other parts of the game.
 * They should be added once at the start of the game and then not changed. Generally try to avoid passing the service
 * manager around, instead fetch the services you need and then inject them into the classes that need them.
 */
export interface ServiceManager {
  /**
   * Add a service
   *
   * @param s the symbol used to lookup the service
   * @param service the service to add
   */
  add(s: string | symbol, service: {}): void;

  /**
   * Get a service
   *
   * @param s the symbol used to lookup the service
   * @returns the service
   */
  get<T extends {}>(s: string | symbol): T;
}
