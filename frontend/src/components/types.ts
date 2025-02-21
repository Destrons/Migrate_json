export interface Item {
    id: number;
    title: string;
    body: string; // ✅ Garante que todos os usos do tipo tenham `body`
  }
  