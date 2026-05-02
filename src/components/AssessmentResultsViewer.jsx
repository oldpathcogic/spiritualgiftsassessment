import React, { useState, useEffect } from 'react';
import { Users, Download, Calendar, Award, BarChart3, RefreshCw } from 'lucide-react';

const GIFT_NAMES = ['Mercy', 'Teaching', 'Prophecy', 'Giving', 'Exhortation', 'Serving', 'Administration'];

export default function AssessmentResultsViewer() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [sortBy, setSortBy] = useState('date'); // date, name, primaryGift

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const response = await fetch('/api/assessments');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to load results.');
      }

      const data = await response.json();
      const normalizedResults = (data.results || []).map((item, index) => {
        const fallbackGifts = [item.primaryGift, item.secondaryGift, item.tertiaryGift]
          .filter(Boolean)
          .map((gift) => ({ gift, score: 0 }));

        return {
          key: item.key || `${item.timestamp || 'unknown'}-${item.name || 'unknown'}-${index}`,
          ...item,
          gifts: Array.isArray(item.gifts) && item.gifts.length > 0 ? item.gifts : fallbackGifts
        };
      });
      setResults(normalizedResults);
    } catch (error) {
      console.error('Failed to load results:', error);
      setLoadError(error.message || 'Failed to load results.');
    } finally {
      setLoading(false);
    }
  };

  const getSortedResults = () => {
    const sorted = [...results];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'primaryGift') {
      sorted.sort((a, b) => a.primaryGift.localeCompare(b.primaryGift));
    }
    return sorted;
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Date', 'Primary Gift', 'Primary Score', 'Secondary Gift', 'Secondary Score', 'Tertiary Gift', 'Tertiary Score', 'Mercy', 'Teaching', 'Prophecy', 'Giving', 'Exhortation', 'Serving', 'Administration'];
    
    const rows = results.map(result => {
      const giftScores = {};
      result.gifts.forEach(g => {
        giftScores[g.gift] = g.score;
      });
      
      return [
        result.name,
        new Date(result.timestamp).toLocaleDateString(),
        result.primaryGift,
        result.gifts[0].score,
        result.secondaryGift,
        result.gifts[1].score,
        result.tertiaryGift,
        result.gifts[2].score,
        giftScores.Mercy || 0,
        giftScores.Teaching || 0,
        giftScores.Prophecy || 0,
        giftScores.Giving || 0,
        giftScores.Exhortation || 0,
        giftScores.Serving || 0,
        giftScores.Administration || 0
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spiritual-gifts-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getGiftDistribution = () => {
    const distribution = {};
    GIFT_NAMES.forEach(gift => {
      distribution[gift] = 0;
    });

    results.forEach(result => {
      if (result.primaryGift) {
        distribution[result.primaryGift]++;
      }
    });

    return distribution;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Source Sans Pro', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw size={48} color="#c9a871" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '16px', fontSize: '18px', color: '#6b5d4f' }}>Loading results...</p>
        </div>
        <style>
          {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  if (selectedPerson) {
    const person = selectedPerson;
    const topThree = person.gifts.slice(0, 3);

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)',
        padding: '40px 20px',
        fontFamily: "'Source Sans Pro', sans-serif"
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button
            onClick={() => setSelectedPerson(null)}
            style={{
              background: 'white',
              border: '2px solid #e8dcc8',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              color: '#3d3426',
              cursor: 'pointer',
              marginBottom: '24px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#faf8f3';
              e.target.style.borderColor = '#c9a871';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#e8dcc8';
            }}
          >
            ← Back to All Results
          </button>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(101, 84, 62, 0.15)',
            marginBottom: '24px'
          }}>
            <h1 style={{
              fontSize: '32px',
              marginBottom: '8px',
              color: '#3d3426',
              fontFamily: "'Crimson Text', serif",
              fontWeight: '600'
            }}>
              {person.name}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b5d4f',
              marginBottom: '0'
            }}>
              Completed: {formatDate(person.timestamp)}
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              marginBottom: '24px',
              color: '#3d3426',
              fontFamily: "'Crimson Text', serif",
              fontWeight: '600'
            }}>
              Top Three Gifts
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {topThree.map((gift, index) => {
                const labels = ['Primary', 'Secondary', 'Tertiary'];
                const colors = ['#c9a871', '#a68a5a', '#8b7349'];
                const percentage = (gift.score / 50) * 100;

                return (
                  <div key={gift.gift} style={{
                    background: '#faf8f3',
                    borderRadius: '8px',
                    padding: '20px',
                    border: index === 0 ? '2px solid #c9a871' : 'none'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <div style={{
                          display: 'inline-block',
                          background: colors[index],
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          textTransform: 'uppercase'
                        }}>
                          {labels[index]}
                        </div>
                        <div style={{
                          fontSize: '22px',
                          fontWeight: '600',
                          color: '#3d3426',
                          fontFamily: "'Crimson Text', serif"
                        }}>
                          {gift.gift}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: colors[index]
                      }}>
                        {gift.score}/50
                      </div>
                    </div>
                    <div style={{
                      height: '8px',
                      background: '#e8dcc8',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        background: colors[index],
                        width: `${percentage}%`,
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              marginBottom: '24px',
              color: '#3d3426',
              fontFamily: "'Crimson Text', serif",
              fontWeight: '600'
            }}>
              All Scores
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {person.gifts.map((gift) => {
                const percentage = (gift.score / 50) * 100;
                return (
                  <div key={gift.gift}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '16px',
                        color: '#3d3426',
                        fontWeight: '500'
                      }}>
                        {gift.gift}
                      </span>
                      <span style={{
                        fontSize: '16px',
                        color: '#6b5d4f',
                        fontWeight: '500'
                      }}>
                        {gift.score}/50
                      </span>
                    </div>
                    <div style={{
                      height: '10px',
                      background: '#f0ebe3',
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #c9a871 0%, #a68a5a 100%)',
                        width: `${percentage}%`,
                        borderRadius: '5px'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sortedResults = getSortedResults();
  const distribution = getGiftDistribution();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)',
      padding: '40px 20px',
      fontFamily: "'Source Sans Pro', sans-serif"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '32px',
          boxShadow: '0 10px 40px rgba(101, 84, 62, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{
                fontSize: '36px',
                marginBottom: '8px',
                color: '#3d3426',
                fontFamily: "'Crimson Text', serif",
                fontWeight: '600'
              }}>
                Assessment Results
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#6b5d4f',
                marginBottom: '0'
              }}>
                {results.length} {results.length === 1 ? 'participant' : 'participants'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={loadResults}
                style={{
                  background: 'white',
                  border: '2px solid #e8dcc8',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  color: '#3d3426',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#faf8f3';
                  e.target.style.borderColor = '#c9a871';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#e8dcc8';
                }}
              >
                <RefreshCw size={18} />
                Refresh
              </button>
              <button
                onClick={downloadCSV}
                disabled={results.length === 0}
                style={{
                  background: results.length > 0 ? 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)' : '#d4cec5',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  color: 'white',
                  cursor: results.length > 0 ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: results.length > 0 ? '0 4px 12px rgba(169, 138, 90, 0.3)' : 'none'
                }}
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {loadError && (
          <div style={{
            background: '#ffebee',
            border: '1px solid #ef9a9a',
            borderRadius: '8px',
            color: '#b71c1c',
            fontSize: '15px',
            marginBottom: '24px',
            padding: '12px 16px'
          }}>
            {loadError}
          </div>
        )}

        {results.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '60px 40px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)'
          }}>
            <Users size={64} color="#c9a871" style={{ marginBottom: '20px' }} />
            <h2 style={{
              fontSize: '24px',
              marginBottom: '12px',
              color: '#3d3426',
              fontFamily: "'Crimson Text', serif"
            }}>
              No Results Yet
            </h2>
            <p style={{
              fontSize: '17px',
              color: '#6b5d4f'
            }}>
              Results will appear here once people complete the assessment.
            </p>
          </div>
        ) : (
          <>
            {/* Gift Distribution Chart */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)'
            }}>
              <h2 style={{
                fontSize: '24px',
                marginBottom: '24px',
                color: '#3d3426',
                fontFamily: "'Crimson Text', serif",
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <BarChart3 size={28} color="#c9a871" />
                Primary Gift Distribution
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {GIFT_NAMES.map(gift => {
                  const count = distribution[gift];
                  const percentage = results.length > 0 ? (count / results.length) * 100 : 0;
                  return (
                    <div key={gift}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          fontSize: '16px',
                          color: '#3d3426',
                          fontWeight: '500'
                        }}>
                          {gift}
                        </span>
                        <span style={{
                          fontSize: '16px',
                          color: '#6b5d4f',
                          fontWeight: '500'
                        }}>
                          {count} {count === 1 ? 'person' : 'people'} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div style={{
                        height: '10px',
                        background: '#f0ebe3',
                        borderRadius: '5px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #c9a871 0%, #a68a5a 100%)',
                          width: `${percentage}%`,
                          borderRadius: '5px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sort Controls */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '16px', color: '#6b5d4f', fontWeight: '500' }}>
                Sort by:
              </span>
              {[
                { value: 'date', label: 'Most Recent' },
                { value: 'name', label: 'Name' },
                { value: 'primaryGift', label: 'Primary Gift' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  style={{
                    background: sortBy === option.value 
                      ? 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)' 
                      : '#faf8f3',
                    color: sortBy === option.value ? 'white' : '#3d3426',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '15px',
                    cursor: 'pointer',
                    fontWeight: sortBy === option.value ? '600' : '500',
                    transition: 'all 0.2s'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div style={{ display: 'grid', gap: '16px' }}>
              {sortedResults.map((person) => (
                <div
                  key={person.key}
                  onClick={() => setSelectedPerson(person)}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(101, 84, 62, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(101, 84, 62, 0.1)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h3 style={{
                        fontSize: '22px',
                        marginBottom: '8px',
                        color: '#3d3426',
                        fontFamily: "'Crimson Text', serif",
                        fontWeight: '600'
                      }}>
                        {person.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#6b5d4f',
                        fontSize: '15px',
                        marginBottom: '16px'
                      }}>
                        <Calendar size={16} />
                        {formatDate(person.timestamp)}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                          { gift: person.primaryGift, label: 'Primary', color: '#c9a871' },
                          { gift: person.secondaryGift, label: 'Secondary', color: '#a68a5a' },
                          { gift: person.tertiaryGift, label: 'Tertiary', color: '#8b7349' }
                        ].map((item) => (
                          <div
                            key={item.label}
                            style={{
                              background: item.color,
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            {item.gift}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#c9a871',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}>
                      View Details →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
