export function Footer(){

    return (
        <footer className="bg-gray-800 text-gray-200 py-8 mt-16 rounded-2xl">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                <h3 className="text-lg font-bold mb-4">Sobre Nós</h3>
                <p className="text-gray-400">
                    Somos uma loja comprometida em oferecer os melhores produtos com qualidade e preço justo.
                    Agradecemos por sua visita!
                </p>
                </div>
                <div>
                <h3 className="text-lg font-bold mb-4">Contato</h3>
                <ul>
                    <li>Email: contato@loja.com</li>
                    <li>Telefone: (11) 1234-5678</li>
                    <li>Endereço: Rua Exemplo, 123, São Paulo, SP</li>
                </ul>
                </div>
                <div>
                <h3 className="text-lg font-bold mb-4">Siga-nos</h3>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                    <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                    <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                    <i className="fab fa-twitter"></i>
                    </a>
                </div>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-8">
                &copy; {new Date().getFullYear()} Loja Exemplo. Todos os direitos reservados.
            </div>
            </div>
        </footer>
    )

}

