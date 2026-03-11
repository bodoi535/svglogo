import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 * 5 } },
});

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "svglogo.dev — Logo Generator" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="antialiased">
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
				<Scripts />
			</body>
		</html>
	);
}
