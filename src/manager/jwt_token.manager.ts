import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default class JWTTokenManager {
  private readonly secret: string;
  private readonly expiresIn: string;
  private graph: Map<string, Map<string, boolean>> = new Map();

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    this.expiresIn = '7d';
  }

  createToken(id: string, ipAddress: string): string {
    const token = jwt.sign({ id, ipAddress }, this.secret, {
      expiresIn: this.expiresIn,
    });

    this.addRelationship(id, ipAddress);
    return token;
  }

  private addRelationship(id: string, ipAddress: string): void {
    // check if the id already exists in the graph
    if (!this.graph.has(id)) {
      this.graph.set(id, new Map());
    }

    // add the ipAddress as a neighbor of the id
    this.graph.get(id)?.set(ipAddress, true);
  }

  // get all ipAddresses associated with an id
  getIpAddressesForId(id: string): string[] {
    if (!this.graph.has(id)) {
      return [];
    }
    return Array.from(this.graph.get(id)?.keys() || []);
  }

  // get all ids associated with an ipAddress
  getIdsForIpAddress(ipAddress: string): string[] {
    const ids: string[] = [];

    for (const [id, neighbors] of this.graph.entries()) {
      if (neighbors.has(ipAddress)) {
        ids.push(id);
      }
    }
    return ids;
  }
}
