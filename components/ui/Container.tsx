import { ReactNode } from "react"


const Container = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className={`min-w-0 max-w-[1366px] mx-auto ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default Container