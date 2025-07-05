import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Link } from "react-router"
import { ModeToggle } from "../mode-toggle"
import { useState } from "react"


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <nav className=" shadow-lg border-b cursor-pointer border-gray-100 dark:border-gray-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand - Left */}
                        <div className="flex-shrink-0">
                            <Link to={'/'} className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">B</span>
                                </div>
                                <span className="dark:text-white ml-2 text-xl font-bold text-gray-900">Book</span>
                            </Link>
                        </div>

                        {/* Navigation Menu - Middle (Desktop) */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link to={'/'}
                                    className="text-gray-600 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                >
                                    Home
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link to={'/about'}
                                    className="text-gray-600 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                >
                                    Books
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link to={'/service'}
                                    className="text-gray-600 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                >
                                    Borrow
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link to={'/portfolio'}
                                    className="text-gray-600 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                >
                                    Service
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link to={'/contact'}
                                    className="text-gray-600 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                >
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </div>
                        </div>

                        {/* CTA Button - Right (Desktop) */}
                        <div className="hidden md:block">
                            <ModeToggle />
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
                                <Link to={'/about'}
                                    className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                                >
                                    Home
                                </Link>
                                <Link to={'/about'}
                                    className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                                >
                                    About
                                </Link>
                                <Link to={'/about'}
                                    className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                                >
                                    Services
                                </Link>
                                <Link to={'/about'}
                                    className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                                >
                                    Portfolio
                                </Link>
                                <Link to={'/about'}
                                    className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                                >
                                    Contact
                                </Link>
                                <div className="pt-2">
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}
