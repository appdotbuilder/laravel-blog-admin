import { Head, Link } from '@inertiajs/react';

interface GalleryImage {
    id: number;
    image_path: string;
    alt_text?: string;
}

interface Gallery {
    id: number;
    title: string;
    slug: string;
    description?: string;
    cover_image?: string;
    event_date?: string;
    images: GalleryImage[];
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface PaginatedGalleries {
    data: Gallery[];
    links: PaginationLink[];
    meta: {
        current_page: number;
        total: number;
        per_page: number;
    };
}

interface Props {
    galleries: PaginatedGalleries;
    [key: string]: unknown;
}

export default function Galleries({ galleries }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="Photo Galleries - Majlis Habibi Rosulullah">
                <meta name="description" content="Browse our photo galleries showcasing community events and activities" />
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                            <Link href="/" className="hover:text-green-600 dark:hover:text-green-400">
                                🏠 Home
                            </Link>
                            <span>/</span>
                            <span className="text-gray-900 dark:text-white">Galleries</span>
                        </nav>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📸 Photo Galleries
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Explore our community events and activities through photos
                        </p>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {galleries.data.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📷</div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                No galleries yet
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Check back soon for photos from our community events!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {galleries.data.map((gallery) => (
                                    <Link
                                        key={gallery.id}
                                        href={`/galleries/${gallery.slug}`}
                                        className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-gray-800"
                                    >
                                        <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                            {gallery.cover_image ? (
                                                <img 
                                                    src={gallery.cover_image} 
                                                    alt={gallery.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : gallery.images.length > 0 ? (
                                                <img 
                                                    src={gallery.images[0].image_path} 
                                                    alt={gallery.images[0].alt_text || gallery.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-4xl text-gray-400">📷</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                                {gallery.title}
                                            </h3>
                                            {gallery.description && (
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                                    {gallery.description}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                    📷 {gallery.images.length} photos
                                                </span>
                                                {gallery.event_date && (
                                                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                        📅 {formatDate(gallery.event_date)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {galleries.links.length > 3 && (
                                <div className="mt-12 flex justify-center">
                                    <div className="flex items-center space-x-2">
                                        {galleries.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                                            link.active
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        className="px-4 py-2 text-gray-400 dark:text-gray-600"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Back to Home */}
                    <div className="mt-12 text-center">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}