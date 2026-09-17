# TODO - Fix MongoDB duplicate key on Product.sku

- [ ] Update `backend/models/Product.js` to use a partial unique index for `sku` so multiple `null`/missing SKUs don’t collide.
- [ ] Remove/clean existing products with `sku: null` (or migrate them to real unique SKUs) if the index creation requires it.
- [ ] Restart backend and verify product creation works when `sku` is omitted.
- [ ] Run a quick check (find/count) for how many documents currently have `sku: null`.

