export type HashMap<V> = { [key: string]: V};

export type Success<S> = { success: true, result: S };
export type Error<E> = { success: false, status: number, error: E };
export type ApiResponse<S, E> = Success<S> | Error<E>;