
"use client"
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Header from '@/common/Header/Header'
import { BreadcrumbCustom } from '@/common/Breadcrumb/breadcrum'

export default function App({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<Provider store={store}>
			<Header />
			<BreadcrumbCustom />
			{children}
		</Provider>
	)
}
