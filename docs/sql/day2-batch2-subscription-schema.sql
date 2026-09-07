-- Apriori Digital SAT Platform
-- Day 2 / Batch 2
-- Subscription, payment, entitlement and receipt foundation.
--
-- This migration deliberately does NOT connect a payment gateway.
-- It establishes the persistent business entities required for
-- server-side access control and future payment integration.

BEGIN;

CREATE TABLE IF NOT EXISTS subscriptions (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    status VARCHAR(30) NOT NULL DEFAULT 'inactive',

    plan_code VARCHAR(100) NOT NULL,

    starts_at TIMESTAMPTZ,

    expires_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT subscriptions_status_check
        CHECK (
            status IN (
                'inactive',
                'active',
                'expired',
                'cancelled'
            )
        )
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id
    ON subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_status
    ON subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_subscriptions_active_period
    ON subscriptions(user_id, status, starts_at, expires_at);


CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    subscription_id BIGINT
        REFERENCES subscriptions(id)
        ON DELETE SET NULL,

    order_id VARCHAR(255),

    gateway_payment_id VARCHAR(255),

    gateway_name VARCHAR(100),

    amount NUMERIC(12, 2) NOT NULL,

    currency VARCHAR(10) NOT NULL DEFAULT 'INR',

    status VARCHAR(30) NOT NULL DEFAULT 'created',

    paid_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT payments_status_check
        CHECK (
            status IN (
                'created',
                'pending',
                'confirmed',
                'failed',
                'cancelled',
                'refunded'
            )
        ),

    CONSTRAINT payments_amount_check
        CHECK (amount >= 0)
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id
    ON payments(user_id);

CREATE INDEX IF NOT EXISTS idx_payments_subscription_id
    ON payments(subscription_id);

CREATE INDEX IF NOT EXISTS idx_payments_order_id
    ON payments(order_id);

CREATE INDEX IF NOT EXISTS idx_payments_gateway_payment_id
    ON payments(gateway_payment_id);


CREATE TABLE IF NOT EXISTS entitlements (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    entitlement_code VARCHAR(100) NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'inactive',

    starts_at TIMESTAMPTZ,

    expires_at TIMESTAMPTZ,

    source_payment_id BIGINT
        REFERENCES payments(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT entitlements_status_check
        CHECK (
            status IN (
                'inactive',
                'active',
                'expired',
                'revoked'
            )
        )
);

CREATE INDEX IF NOT EXISTS idx_entitlements_user_id
    ON entitlements(user_id);

CREATE INDEX IF NOT EXISTS idx_entitlements_code_status
    ON entitlements(entitlement_code, status);

CREATE INDEX IF NOT EXISTS idx_entitlements_active_period
    ON entitlements(user_id, status, starts_at, expires_at);


CREATE TABLE IF NOT EXISTS receipts (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    payment_id BIGINT NOT NULL
        REFERENCES payments(id)
        ON DELETE RESTRICT,

    receipt_number VARCHAR(100) NOT NULL,

    amount NUMERIC(12, 2) NOT NULL,

    currency VARCHAR(10) NOT NULL DEFAULT 'INR',

    status VARCHAR(30) NOT NULL DEFAULT 'issued',

    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT receipts_status_check
        CHECK (
            status IN (
                'issued',
                'void'
            )
        ),

    CONSTRAINT receipts_amount_check
        CHECK (amount >= 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_receipts_receipt_number
    ON receipts(receipt_number);

CREATE UNIQUE INDEX IF NOT EXISTS idx_receipts_payment_id
    ON receipts(payment_id);

CREATE INDEX IF NOT EXISTS idx_receipts_user_id
    ON receipts(user_id);


COMMIT;
