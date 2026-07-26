import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "@/store/auth-store";
import { env } from "@/config/env";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@/lib/socket/socket-events";

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socketInstance: AppSocket | null = null;

/**
 * USE CASE: One shared Socket.IO client for the whole app.
 *
 * HOW TO USE:
 *   // After login
 *   connectSocket()
 *
 *   // Listen (client component / useEffect only)
 *   const socket = getSocket()
 *   socket.on("notification:new", handler)
 *
 *   // On logout
 *   disconnectSocket()
 *
 *   // After access-token refresh
 *   reconnectSocket()
 *
 * ⚠️ Never call getSocket() during SSR — only in useEffect / browser handlers.
 */
export function getSocket(): AppSocket {
  if (typeof window === "undefined") {
    throw new Error(
      "getSocket() was called on the server. Use it only in client code (useEffect, handlers).",
    );
  }

  if (!socketInstance) {
    socketInstance = io(env.socketUrl, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      reconnectionDelayMax: 5000,
      auth: (cb) => {
        // Fresh token on every (re)connect — never a stale import-time value
        const token = useAuthStore.getState().getAccessToken();
        cb({ token: token || undefined });
      },
    });
  }

  return socketInstance;
}

/** Call after login succeeds. */
export function connectSocket(): void {
  const socket = getSocket();
  if (!socket.connected) socket.connect();
}

/** Call on logout / session expiry. */
export function disconnectSocket(): void {
  if (socketInstance?.connected) {
    socketInstance.disconnect();
  }
}

/** Call after token refresh so the server gets the new auth payload. */
export function reconnectSocket(): void {
  const socket = getSocket();
  if (socket.connected) {
    socket.disconnect();
    setTimeout(() => socket.connect(), 100);
  } else {
    socket.connect();
  }
}
