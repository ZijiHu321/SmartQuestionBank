'use client';

import React from 'react';

type SearchItemProps = {
    search: string;
    setSearch: (value: string) => void;
};

const SearchItem = ({ search, setSearch }: SearchItemProps) => {
    return (
        <div style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            padding: '0 20px'
        }}>
            <form 
                onSubmit={(e) => e.preventDefault()}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}
            >
                <label 
                    htmlFor='search'
                    style={{
                        fontSize: '1rem',
                        color: '#37474f',
                        fontWeight: '500',
                        marginLeft: '4px'
                    }}
                >
                    Search
                </label>
                <input
                    id='search'
                    type='text'
                    role='searchbox'
                    placeholder='Search Items'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '2px solid #dee2e6',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                    }}
                />
            </form>
        </div>
    )
}

export default SearchItem;