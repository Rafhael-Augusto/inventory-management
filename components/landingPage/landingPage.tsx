import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Gerenciamento de Estoque
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Simplifique o controle do seu estoque com nosso sistema poderoso e
            fácil de usar. Acompanhe produtos, monitore níveis de estoque e
            obtenha insights valiosos.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/login"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="#"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
