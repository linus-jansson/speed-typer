import '../styles/globals.css';

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className='bg-neutral-900'>{children}</body>
        </html>
    );
}
