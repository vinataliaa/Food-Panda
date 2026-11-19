import React, { useState } from 'react';
import { Flame, Plus, Utensils } from 'lucide-react';
import { MenuItem } from '../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  cartQuantity: number;
  onOpenDetail: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  cartQuantity,
  onOpenDetail,
  onQuickAdd,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onOpenDetail(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetail(item);
        }
      }}
      className="group relative flex items-stretch justify-between gap-4 p-4 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-150 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D70F64]"
    >
      {/* Left Text Info Column */}
      <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold text-neutral-900 leading-snug line-clamp-1">
              {item.name}
            </h3>
            {item.isSpicy && (
              <Flame
                className="w-3.5 h-3.5 text-orange-600 shrink-0"
                aria-label="Spicy item"
              />
            )}
          </div>

          <p className="mt-1 text-[13px] leading-relaxed text-neutral-600 line-clamp-2">
            {item.description}
          </p>

          {/* Sensory note (E) */}
          {item.sensoryNote && (
            <p className="mt-1 text-[11px] italic text-amber-800 line-clamp-1">
              {item.sensoryNote}
            </p>
          )}
        </div>

        {/* Price + Unboxed CLOSERS Recognition (R) & Loss Avoidance (L) Metadata */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
          <span className="text-sm font-semibold text-neutral-900 tabular-nums">
            S$ {item.price.toFixed(2)}
          </span>
          {item.positivePercent && item.orderedToday && (
            <>
              <span className="text-neutral-300" aria-hidden="true">
                ·
              </span>
              <span className="text-emerald-700 font-medium tabular-nums">
                {item.positivePercent}% liked ({item.orderedToday} today)
              </span>
            </>
          )}
          {item.remainingBatch && (
            <>
              <span className="text-neutral-300" aria-hidden="true">
                ·
              </span>
              <span className="text-[#D70F64] font-semibold tabular-nums">
                Only {item.remainingBatch} left in warm batch
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right Square Thumbnail + Quick Add Button */}
      <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
        {!imgError ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-stone-100 flex flex-col items-center justify-center text-stone-400 p-2 text-center">
            <Utensils className="w-5 h-5 mb-1" aria-hidden="true" />
            <span className="text-[10px] font-medium text-stone-600 line-clamp-2">
              {item.name}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={(e) => onQuickAdd(item, e)}
          aria-label={`Add ${item.name} to cart`}
          className={`absolute bottom-2 right-2 min-w-[34px] h-[34px] px-2 rounded-full flex items-center justify-center shadow-sm transition-all cursor-pointer ${
            cartQuantity > 0
              ? 'bg-[#D70F64] text-white font-bold text-xs tabular-nums'
              : 'bg-white text-neutral-800 border border-neutral-200 hover:bg-[#D70F64] hover:text-white hover:border-[#D70F64]'
          }`}
        >
          {cartQuantity > 0 ? (
            <span>{cartQuantity}</span>
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
      </div>
    </article>
  );
};
