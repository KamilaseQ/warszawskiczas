import Link from 'next/link'
import { Watch } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui'
import type { Product } from '@/data/mock-products'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const formattedPrice = product.price
    ? new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 0,
      }).format(product.price)
    : null

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-md border border-border bg-background transition-colors hover:border-accent-green/30',
        className
      )}
    >
      {/* Badges */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {product.isNew && <Badge>Nowość</Badge>}
        {product.isExclusive && <Badge variant="premium">Na zapytanie</Badge>}
      </div>

      {/* Image Placeholder */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <Watch className="h-16 w-16 text-border" strokeWidth={1} />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {formattedPrice || 'Cena na zapytanie'}
          </span>
          <Link
            href="/kontakt"
            className="text-sm font-medium text-accent-green transition-colors hover:text-accent-green/80"
          >
            Zapytaj
          </Link>
        </div>
      </div>
    </article>
  )
}
