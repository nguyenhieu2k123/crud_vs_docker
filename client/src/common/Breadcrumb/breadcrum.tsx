"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export function BreadcrumbCustom() {
	const pathname = usePathname();


	const pathnames = pathname.split('/').filter(Boolean);

	return (
		<div className="container py-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					{pathnames.map((value, index) => {
						const href = `/${pathnames.slice(0, index + 1).join('/')}`;
						const isLast = index === pathnames.length - 1;

						return (
							<React.Fragment key={href}>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage>{capitalize(value)}</BreadcrumbPage>
									) : (
										<BreadcrumbLink href={href}>{capitalize(value)}</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
