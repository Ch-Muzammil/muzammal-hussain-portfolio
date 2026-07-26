/**
 * Socket.IO event maps.
 *
 * HOW TO USE:
 *   Add events here as the backend documents them, e.g.:
 *
 *   export type ServerToClientEvents = {
 *     "notification:new": (payload: { id: string; message: string }) => void;
 *   };
 *
 *   export type ClientToServerEvents = {
 *     "room:join": (roomId: string) => void;
 *   };
 *
 * Keep this file as the single source of truth for socket typings.
 */

export type ServerToClientEvents = Record<string, never>;

export type ClientToServerEvents = Record<string, never>;
