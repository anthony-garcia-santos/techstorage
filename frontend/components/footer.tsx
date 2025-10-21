import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TechStore</h3>
            <p className="opacity-80">Sua loja de tecnologia premium</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Produtos</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="/products" className="hover:opacity-100">
                  Todos
                </Link>
              </li>
              <li>
                <Link href="/products?cat=phones" className="hover:opacity-100">
                  Celulares
                </Link>
              </li>
              <li>
                <Link href="/products?cat=laptops" className="hover:opacity-100">
                  Laptops
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="/contact" className="hover:opacity-100">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:opacity-100">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:opacity-100">
                  Envio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="/privacy" className="hover:opacity-100">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-100">
                  Termos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center opacity-80">
          <p>&copy; 2025 TechStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
