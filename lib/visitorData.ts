// lib/visitorData.ts
let globalVisitors: any[] = [];

export function addVisitor(visitor: any) {
  globalVisitors.push(visitor);
}

export function getVisitors() {
  return globalVisitors;
}