'use client';

import React from 'react';

type SearchItemProps = {
    search: string;
    setSearch: (value: string) => void;
};

const SearchItem = ({ search, setSearch }: SearchItemProps) => {
    return (
        <div className="search-container">
            <form 
                onSubmit={(e) => e.preventDefault()}
                className="search-form"
            >
                <label 
                    htmlFor='search'
                    className="search-label"
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
                    className="search-input"
                />
            </form>

            <style jsx>{`
                .search-container {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto 2rem;
                    padding: 0 20px;
                }

                .search-form {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .search-label {
                    font-size: 1rem;
                    color: #37474f;
                    font-weight: 500;
                    margin-left: 4px;
                }

                .search-input {
                    padding: 12px 16px;
                    border-radius: 8px;
                    border: 2px solid #dee2e6;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .search-input:focus {
                    border-color: #37474f;
                    box-shadow: 0 0 0 3px rgba(55, 71, 79, 0.1);
                }

                .search-input:hover {
                    border-color: #adb5bd;
                }

                @media (max-width: 768px) {
                    .search-container {
                        padding: 0 10px;
                        margin: 0 auto 1.5rem;
                    }

                    .search-input {
                        padding: 10px 14px;
                        font-size: 0.9rem;
                    }

                    .search-label {
                        font-size: 0.9rem;
                        margin-left: 2px;
                    }
                }

                @media (max-width: 480px) {
                    .search-container {
                        padding: 0 5px;
                    }

                    .search-input {
                        padding: 8px 12px;
                    }
                }
            `}</style>
        </div>
    )
}

export default SearchItem;