import { ServiceManager } from "./ServiceManager";

/**
 * Service manager used by the game
 */
export class GameServiceManager implements ServiceManager {
  private services = new Map<string | symbol, {}>();

  /**
   * Add a service
   *
   * @param s the symbol used to lookup the service
   * @param service the service to add
   */
  public add(s: string | symbol, service: {}): void {
    this.services.set(s, service);
  }

  /**
   * Get a service
   *
   * @param s the symbol used to lookup the service
   * @returns the service
   */
  public get<T extends {}>(s: string | symbol): T {
    const service = this.services.get(s);
    if (!service) {
      throw new Error(`Service ${s.toString()} not found`);
    }

    return service as T;
  }
}
