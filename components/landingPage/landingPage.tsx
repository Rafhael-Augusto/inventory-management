import { CreateAccountButton } from "./createAccountButton";

export function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-8 w-screen my-16">
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-green-500" />
        <span className="text-green-600">Estoque, simplificado</span>
      </div>
      <h1 className="text-8xl max-w-1/2 bg-primary/10 rounded-sm p-8">
        Saiba o que está na <i className="text-primary/95">prateleira</i>, antes
        de acabar.
      </h1>

      <p className="text-xl max-w-1/3 text-primary/60 bg-primary/10 rounded-sm p-8">
        O Stockwise oferece a pequenas equipes uma visão clara de cada produto,
        preço e nível de estoque — para você parar de adivinhar e repor na hora
        certa.
      </p>

      <CreateAccountButton />
    </div>
  );
}
