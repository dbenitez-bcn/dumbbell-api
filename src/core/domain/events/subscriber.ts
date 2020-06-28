import DumbbellEvent from "./events/dumbbellEvent";

export type Subscriber = (event: DumbbellEvent) => void;