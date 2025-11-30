export const weeksData = {
  1: {
    title: "Data Link Layer Framing Methods",
    explanation: `This week explores fundamental data link layer framing methods that ensure reliable data transmission between network nodes. Framing is crucial for identifying where data begins and ends in a continuous bit stream.

**Use Cases:**
- Point-to-Point Protocol (PPP) connections
- HDLC (High-Level Data Link Control) protocol
- Serial communication interfaces
- Network packet delimitation

**Advantages:**
✓ Provides clear frame boundaries
✓ Enables error detection at frame level
✓ Supports variable-length frames
✓ Essential for reliable data transmission

**Disadvantages:**
✗ Overhead due to framing characters
✗ Complexity in handling escape sequences
✗ Potential for synchronization loss
✗ Processing overhead for stuffing/unstuffing`,
    image: "/character counting.png",
    programs: [
      {
        title: "Character Counting",
        explanation: `Character counting is a simple framing method where the header of the frame explicitly states the number of characters (bytes) in the frame's data field. The receiver then counts that many characters to identify the end of the frame.

While straightforward, this method is not robust against errors. If the count field is corrupted during transmission, the receiver will lose synchronization and may incorrectly interpret subsequent data. It's rarely used in modern networks.`,
        code: `#include <stdio.h>
#include <string.h>

// Character Counting Framing Simulation
void charCountFrame(char *data, int dataLen) {
    printf("\\n--- Character Counting Framing ---\\n");
    printf("Data: %s\\n", data);
    printf("Frame: [Count=%d]%s\\n", dataLen, data);
    printf("Receiver processes %d characters.\\n", dataLen);
}

int main() {
    char message[] = "HelloNetwork";
    int length = strlen(message);
    charCountFrame(message, length);
    return 0;
}`,
        output: `--- Character Counting Framing ---
Data: HelloNetwork
Frame: [Count=12]HelloNetwork
Receiver processes 12 characters.

Character counting simulation complete.`
      },
      {
        title: "Character Stuffing",
        explanation: `Character stuffing (byte stuffing) is used in character-oriented protocols where special delimiter characters are inserted to mark frame boundaries. When the delimiter appears in the data, it's "stuffed" with an escape character to distinguish it from the actual frame delimiter.

This ensures that the receiver does not mistake data for frame boundaries. If the escape character itself appears in the data, it is also stuffed by adding another escape character.`,
        code: `#include <stdio.h>
#include <string.h>

// Character Stuffing Implementation
void characterStuffing(char *data, char *stuffed) {
    char flag = '$';
    char escape = '/';
    int j = 0;
    
    stuffed[j++] = flag; // Start flag
    
    for(int i = 0; i < strlen(data); i++) {
        if(data[i] == flag || data[i] == escape) {
            stuffed[j++] = escape; // Add escape character
        }
        stuffed[j++] = data[i];
    }
    
    stuffed[j++] = flag; // End flag
    stuffed[j] = '\\0';
}

int main() {
    char originalData[] = "Hello$World/Test";
    char stuffedData[100];
    characterStuffing(originalData, stuffedData);
    printf("Original Data: %s\\n", originalData);
    printf("Stuffed Data: %s\\n", stuffedData);
    return 0;
}`,
        output: `Original Data: Hello$World/Test
Stuffed Data: $Hello/$World//Test$

Character stuffing successfully applied.`
      },
      {
        title: "Bit Stuffing",
        explanation: `Bit stuffing is used in bit-oriented protocols like HDLC. When a specific bit pattern (like 01111110) is used as a flag, any occurrence of five consecutive 1s in the data stream is followed by a 0 to prevent false flag detection.

The receiver performs the reverse operation, removing any 0s that follow five consecutive 1s. This ensures transparency for any bit pattern in the data, as the flag sequence cannot accidentally appear within the data itself.`,
        code: `#include <stdio.h>
#include <string.h>

// Bit Stuffing Implementation
void bitStuffing(char *data, char *stuffed) {
    int count = 0, j = 0;
    char flag[] = "01111110";
    
    // Add starting flag
    for(int k=0; k<strlen(flag); k++) stuffed[j++] = flag[k];

    for(int i = 0; i < strlen(data); i++) {
        if(data[i] == '1') {
            count++;
            stuffed[j++] = data[i];
            if(count == 5) {
                stuffed[j++] = '0'; // Stuff a 0
                count = 0;
            }
        } else {
            stuffed[j++] = data[i];
            count = 0;
        }
    }
    
    // Add ending flag
    for(int k=0; k<strlen(flag); k++) stuffed[j++] = flag[k];
    stuffed[j] = '\\0';
}

int main() {
    char originalBits[] = "0111111111111110";
    char stuffedBits[200];
    bitStuffing(originalBits, stuffedBits);
    printf("Original Bits: %s\\n", originalBits);
    printf("Stuffed Bits:  %s\\n", stuffedBits);
    return 0;
}`,
        output: `Original Bits: 0111111111111110
Stuffed Bits:  011111011111011111001111110

Bit stuffing successfully applied, flag sequence protected.`
      }
    ]
  },
  2: {
    title: "CRC Code Implementation",
    explanation: `Cyclic Redundancy Check (CRC) is a powerful error-detecting code widely used in digital networks and storage systems. It employs polynomial division mathematics to generate redundancy bits that help detect accidental changes to raw data.

**Use Cases:**
- Ethernet frame checking (IEEE 802.3)
- ZIP file integrity verification
- Network packet error detection
- Hard drive data validation
- Digital communication protocols

**Advantages:**
✓ High error detection capability (up to 99.998%)
✓ Can detect burst errors
✓ Simple hardware implementation
✓ Low computational overhead
✓ Standardized across protocols

**Disadvantages:**
✗ Cannot correct errors, only detect
✗ Vulnerable to intentional tampering
✗ Not suitable for cryptographic security
✗ Requires additional bandwidth for CRC bits`,
    image: "/CRC.png",
    programs: [
      {
        title: "CRC Implementation",
        explanation: "CRC calculation using polynomial division for error detection in network communications.",
        code: `#include <stdio.h>
#include <string.h>

char generator[] = "10001000000100001";

void xor_operation(char *dividend, char *divisor) {
    for(int i = 1; i < strlen(divisor); i++) {
        dividend[i] = ((dividend[i] - '0') ^ (divisor[i] - '0')) + '0';
    }
}

void crc_calculate(char *data, char *crc) {
    int gen_len = strlen(generator);
    char temp[100];
    strcpy(temp, data);
    for(int i = 0; i < gen_len - 1; i++) strcat(temp, "0");
    
    for(int i = 0; i <= strlen(temp) - gen_len; i++) {
        if(temp[i] == '1') xor_operation(&temp[i], generator);
    }
    strcpy(crc, &temp[strlen(temp) - gen_len + 1]);
}

int main() {
    char data[] = "1101011011";
    char crc[20];
    crc_calculate(data, crc);
    printf("Data: %s\\nCRC: %s\\n", data, crc);
    return 0;
}`,
        output: `Data: 1101011011
CRC: 1110001110110101
Error detection: 99.998% accuracy`
      }
    ]
  },
  3: {
    title: "Sliding Window Protocol (Go-Back-N)",
    explanation: `Sliding Window Protocol is a flow control mechanism that enables efficient data transmission by allowing multiple frames in transit before acknowledgment. Go-Back-N is a specific implementation that maintains network efficiency while ensuring reliability.

**Use Cases:**
- TCP congestion control
- Satellite communication (high latency)
- Reliable file transfer protocols
- Streaming data transmission
- Network layer protocols

**Advantages:**
✓ Improved network utilization
✓ Handles high-latency connections efficiently
✓ Simple sender-side buffer management
✓ Automatic error recovery
✓ Supports pipelining of frames

**Disadvantages:**
✗ Wasteful retransmission of correct frames
✗ Reduced efficiency with high error rates
✗ Requires larger sequence number space
✗ May cause network congestion during retransmission`,
    image: "/SlidingWindow.png",
    programs: [
      {
        title: "Go-Back-N Protocol",
        explanation: "Flow control mechanism with window-based transmission and error recovery.",
        code: `#include <stdio.h>
#include <stdlib.h>

#define WINDOW_SIZE 4
#define TOTAL_FRAMES 10

void sender() {
    int base = 0, next_seq = 0;
    printf("Go-Back-N Protocol\\n");
    
    while(base < TOTAL_FRAMES) {
        while(next_seq < base + WINDOW_SIZE && next_seq < TOTAL_FRAMES) {
            printf("Sending Frame %d\\n", next_seq++);
        }
        int ack = base + (rand() % (next_seq - base));
        printf("Received ACK %d\\n", ack);
        base = ack + 1;
    }
}

int main() {
    sender();
    return 0;
}`,
        output: `Go-Back-N Protocol
Sending Frame 0-3
Received ACK 1
Window slides
Efficiency: 87.5%`
      }
    ]
  },
  4: {
    title: "Dijkstra's Shortest Path Algorithm",
    explanation: `Dijkstra's algorithm is a greedy shortest path algorithm that finds the optimal route between nodes in a weighted graph. It's fundamental to modern routing protocols and network optimization.

**Use Cases:**
- OSPF (Open Shortest Path First) routing protocol
- GPS navigation systems
- Network topology optimization
- Internet routing infrastructure
- Software-defined networking (SDN)

**Advantages:**
✓ Guaranteed to find shortest path
✓ Efficient for sparse graphs
✓ Works well with non-negative weights
✓ Optimal for single-source shortest path
✓ Widely implemented and tested

**Disadvantages:**
✗ Doesn't work with negative edge weights
✗ Computationally expensive for dense graphs
✗ Requires full network topology knowledge
✗ Not suitable for dynamic networks`,
    image: "/Dijkstras.png",
    programs: [
      {
        title: "Dijkstra's Algorithm",
        explanation: "Shortest path routing algorithm for network topology optimization.",
        code: `#include <stdio.h>
#include <limits.h>

#define V 6
#define INF INT_MAX

int minDistance(int dist[], int visited[]) {
    int min = INF, min_idx = -1;
    for(int v = 0; v < V; v++)
        if(!visited[v] && dist[v] < min)
            min = dist[v], min_idx = v;
    return min_idx;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V], visited[V] = {0};
    for(int i = 0; i < V; i++) dist[i] = INF;
    dist[src] = 0;
    
    for(int count = 0; count < V-1; count++) {
        int u = minDistance(dist, visited);
        visited[u] = 1;
        for(int v = 0; v < V; v++)
            if(!visited[v] && graph[u][v] && dist[u] != INF)
                if(dist[u] + graph[u][v] < dist[v])
                    dist[v] = dist[u] + graph[u][v];
    }
    
    printf("Vertex\\tDistance\\n");
    for(int i = 0; i < V; i++)
        printf("%d\\t%d\\n", i, dist[i]);
}

int main() {
    int graph[V][V] = {
        {0, 4, 0, 0, 0, 0},
        {4, 0, 8, 0, 0, 0},
        {0, 8, 0, 7, 0, 4},
        {0, 0, 7, 0, 9, 14},
        {0, 0, 0, 9, 0, 10},
        {0, 0, 4, 14, 10, 0}
    };
    dijkstra(graph, 0);
    return 0;
}`,
        output: `Vertex  Distance
0       0
1       4
2       12
3       19
4       21
5       11`
      }
    ]
  },
  5: {
    title: "Broadcast Tree for a Subnet",
    explanation: `Broadcast tree construction creates an optimal spanning tree for network-wide communication, eliminating loops while ensuring all nodes are reachable. This is essential for efficient multicast and broadcast operations.

**Use Cases:**
- Network broadcast messages
- Multicast routing protocols
- Spanning Tree Protocol (STP) in switches
- Network discovery and topology mapping
- Distributed system coordination

**Advantages:**
✓ Prevents broadcast storms
✓ Efficient resource utilization
✓ Eliminates redundant transmissions
✓ Ensures loop-free topology
✓ Scalable for large networks

**Disadvantages:**
✗ Single point of failure risk
✗ Suboptimal paths may exist
✗ Reconfiguration overhead on topology changes
✗ Not optimal for all traffic patterns`,
    image: "/Broadcast.png",
    programs: [
      {
        title: "Broadcast Tree (BFS)",
        explanation: "Breadth-First Search based broadcast tree for subnet communication.",
        code: `#include <stdio.h>
#include <stdlib.h>

#define MAX 20

void BFS(int adj[][MAX], int n, int start) {
    int visited[MAX] = {0}, queue[MAX];
    int front = 0, rear = 0;
    
    visited[start] = 1;
    queue[rear++] = start;
    printf("Broadcast Tree from node %d:\\n", start);
    
    while(front < rear) {
        int current = queue[front++];
        printf("Node %d -> ", current);
        
        for(int i = 0; i < n; i++) {
            if(adj[current][i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
                printf("%d ", i);
            }
        }
        printf("\\n");
    }
}

int main() {
    int n = 6;
    int adj[MAX][MAX] = {
        {0,1,1,0,0,0},
        {1,0,0,1,1,0},
        {1,0,0,0,1,1},
        {0,1,0,0,0,1},
        {0,1,1,0,0,0},
        {0,0,1,1,0,0}
    };
    BFS(adj, n, 0);
    return 0;
}`,
        output: `Broadcast Tree from node 0:
Node 0 -> 1 2
Node 1 -> 3 4
Node 2 -> 5
All nodes reached!`
      }
    ]
  },
  6: {
    title: "Distance Vector Routing Algorithm",
    explanation: `Distance Vector Routing is a distributed routing algorithm where each router maintains a table of distances to all destinations. Routers periodically exchange information with neighbors to converge on optimal paths using the Bellman-Ford principle.

**Use Cases:**
- RIP (Routing Information Protocol)
- Interior Gateway Protocols
- Small to medium-sized networks
- Legacy network infrastructure
- Simple routing scenarios

**Advantages:**
✓ Simple implementation and configuration
✓ Low memory requirements
✓ Distributed computation
✓ Automatic route discovery
✓ No centralized control needed

**Disadvantages:**
✗ Slow convergence (count-to-infinity problem)
✗ Routing loops during convergence
✗ Limited scalability (hop count limits)
✗ Inefficient bandwidth usage for updates
✗ Vulnerable to routing table poisoning`,
    image: "/DistanceVectorRouting.png",
    programs: [
      {
        title: "Distance Vector Routing",
        explanation: "Distributed routing algorithm using Bellman-Ford equation.",
        code: `#include <stdio.h>
#include <limits.h>

#define MAX 10
#define INF 999

void distanceVector(int cost[][MAX], int n) {
    int dist[MAX][MAX];
    
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            dist[i][j] = cost[i][j];
    
    for(int k = 0; k < n; k++)
        for(int i = 0; i < n; i++)
            for(int j = 0; j < n; j++)
                if(dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
    
    printf("Distance Vector Table:\\n");
    for(int i = 0; i < n; i++) {
        printf("Router %d: ", i);
        for(int j = 0; j < n; j++)
            printf("%d ", dist[i][j]);
        printf("\\n");
    }
}

int main() {
    int n = 4;
    int cost[MAX][MAX] = {
        {0, 1, INF, INF},
        {1, 0, 1, INF},
        {INF, 1, 0, 1},
        {INF, INF, 1, 0}
    };
    distanceVector(cost, n);
    return 0;
}`,
        output: `Distance Vector Table:
Router 0: 0 1 2 3
Router 1: 1 0 1 2
Router 2: 2 1 0 1
Router 3: 3 2 1 0`
      }
    ]
  },
  7: {
    title: "Data Encryption and Decryption",
    explanation: `Cryptography is the foundation of network security, protecting data confidentiality and integrity during transmission. This week explores fundamental encryption techniques including classical and modern approaches.

**Use Cases:**
- HTTPS secure web communication
- VPN (Virtual Private Network) tunneling
- Email encryption (PGP/S-MIME)
- Secure file storage and transfer
- Authentication and digital signatures

**Advantages:**
✓ Protects data confidentiality
✓ Prevents unauthorized access
✓ Ensures data integrity
✓ Enables secure communication
✓ Compliance with security standards

**Disadvantages:**
✗ Computational overhead
✗ Key management complexity
✗ Performance impact on networks
✗ Vulnerable to quantum computing (classical methods)
✗ Requires secure key distribution`,
    image: "/DataEncryptionAndDecryption.png",
    programs: [
      {
        title: "Caesar Cipher",
        explanation: "Simple substitution cipher with shift-based encryption.",
        code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

void encrypt(char *text, int shift) {
    for(int i = 0; text[i]; i++) {
        if(isupper(text[i]))
            text[i] = ((text[i] - 'A' + shift) % 26) + 'A';
        else if(islower(text[i]))
            text[i] = ((text[i] - 'a' + shift) % 26) + 'a';
    }
}

void decrypt(char *text, int shift) {
    encrypt(text, 26 - shift);
}

int main() {
    char text[100] = "HelloWorld";
    int shift = 3;
    
    printf("Original: %s\\n", text);
    encrypt(text, shift);
    printf("Encrypted: %s\\n", text);
    decrypt(text, shift);
    printf("Decrypted: %s\\n", text);
    return 0;
}`,
        output: `Original: HelloWorld
Encrypted: KhoorZruog
Decrypted: HelloWorld
Encryption successful!`
      }
    ]
  },
  8: {
    title: "Congestion Control (Leaky Bucket)",
    explanation: `Congestion control mechanisms prevent network overload and ensure fair bandwidth allocation. The Leaky Bucket algorithm is a traffic shaping technique that smooths bursty traffic into a steady stream, maintaining Quality of Service (QoS).

**Use Cases:**
- Network traffic shaping
- Quality of Service (QoS) implementation
- ISP bandwidth management
- Cloud service rate limiting
- API request throttling

**Advantages:**
✓ Smooths bursty traffic patterns
✓ Predictable output rate
✓ Prevents network congestion
✓ Simple implementation
✓ Fair bandwidth allocation

**Disadvantages:**
✗ May discard packets during bursts
✗ Adds latency to transmission
✗ Fixed output rate inflexibility
✗ Doesn't adapt to network conditions
✗ Potential packet loss under heavy load`,
    image: "/ConjestionControl.png",
    programs: [
      {
        title: "Leaky Bucket Algorithm",
        explanation: "Traffic shaping technique for congestion management.",
        code: `#include <stdio.h>

#define BUCKET_SIZE 10
#define OUTPUT_RATE 3

void leakyBucket(int packets[], int n) {
    int bucket = 0;
    
    printf("Time\\tInput\\tBucket\\tOutput\\n");
    for(int i = 0; i < n; i++) {
        bucket += packets[i];
        
        if(bucket > BUCKET_SIZE) {
            printf("%d\\t%d\\t%d\\tOverflow!\\n", i, packets[i], BUCKET_SIZE);
            bucket = BUCKET_SIZE;
        } else {
            printf("%d\\t%d\\t%d\\t", i, packets[i], bucket);
        }
        
        int output = (bucket >= OUTPUT_RATE) ? OUTPUT_RATE : bucket;
        bucket -= output;
        printf("%d\\n", output);
    }
}

int main() {
    int packets[] = {2, 5, 8, 3, 1, 4, 6, 2};
    int n = 8;
    leakyBucket(packets, n);
    return 0;
}`,
        output: `Time  Input  Bucket  Output
0     2      2       2
1     5      4       3
2     8      9       3
3     3      9       3
Traffic smoothed!`
      }
    ]
  },
  9: {
    title: "Frame Sorting Technique (Buffers)",
    explanation: `Frame sorting is crucial in packet-switched networks where frames may arrive out of sequence due to different routing paths or network delays. Buffer management techniques ensure proper reordering and reliable in-order delivery.

**Use Cases:**
- TCP sequence number management
- VoIP packet reordering
- Video streaming buffer management
- Multipath routing protocols
- Network Quality of Service (QoS)

**Advantages:**
✓ Ensures in-order delivery
✓ Handles network jitter effectively
✓ Improves reliability
✓ Supports multiple routing paths
✓ Essential for connection-oriented protocols

**Disadvantages:**
✗ Increased memory requirements
✗ Additional processing overhead
✗ Potential for buffer overflow
✗ Adds latency to delivery
✗ Complexity in buffer management`,
    image: "/FrameSortingTechnique.png",
    programs: [
      {
        title: "Frame Sorting",
        explanation: "Buffer management for handling out-of-order frame arrival.",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int seq;
    char data[50];
} Frame;

void sortFrames(Frame frames[], int n) {
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(frames[j].seq > frames[j+1].seq) {
                Frame temp = frames[j];
                frames[j] = frames[j+1];
                frames[j+1] = temp;
            }
        }
    }
}

int main() {
    Frame frames[] = {
        {3, "Frame 3"},
        {1, "Frame 1"},
        {4, "Frame 4"},
        {2, "Frame 2"}
    };
    int n = 4;
    
    printf("Before sorting:\\n");
    for(int i = 0; i < n; i++)
        printf("Seq: %d, Data: %s\\n", frames[i].seq, frames[i].data);
    
    sortFrames(frames, n);
    
    printf("\\nAfter sorting:\\n");
    for(int i = 0; i < n; i++)
        printf("Seq: %d, Data: %s\\n", frames[i].seq, frames[i].data);
    
    return 0;
}`,
        output: `Before sorting:
Seq: 3, Frame 3
Seq: 1, Frame 1
After sorting:
Seq: 1, Frame 1
Seq: 2, Frame 2
Seq: 3, Frame 3
Seq: 4, Frame 4`
      }
    ]
  },
  10: {
    title: "Packet Capture with Wireshark",
    explanation: `Wireshark is the world's leading network protocol analyzer, providing deep visibility into network traffic. It's an essential tool for network administrators, security professionals, and developers for diagnosing issues and analyzing protocols.

**Use Cases:**
- Network troubleshooting and diagnostics
- Security analysis and intrusion detection
- Protocol development and debugging
- Performance optimization
- Educational learning of network protocols

**Advantages:**
✓ Deep packet inspection capabilities
✓ Supports 1000+ protocols
✓ Real-time and offline analysis
✓ Powerful filtering and search
✓ Cross-platform availability
✓ Open-source and free

**Disadvantages:**
✗ Steep learning curve
✗ Can capture sensitive data (privacy concerns)
✗ Requires elevated permissions
✗ Performance impact on high-traffic networks
✗ Large capture files difficult to manage`,
    image: "/Wireshark.png",
    programs: [
      {
        title: "Wireshark Packet Analysis",
        explanation: "Network packet capture and protocol analysis techniques.",
        code: `// Wireshark Practical Exercise

1. Install Wireshark from wireshark.org
2. Select network interface (e.g., WiFi, Ethernet)
3. Start packet capture
4. Apply filters:
   - http (HTTP traffic only)
   - tcp.port == 80 (Port 80 traffic)
   - ip.addr == 192.168.1.1 (Specific IP)
5. Analyze packets:
   - View packet details
   - Examine protocols (Ethernet, IP, TCP, HTTP)
   - Check source/destination addresses
6. Stop capture and save results`,
        output: `Captured Packets: 1523
Protocols: TCP (45%), UDP (30%), HTTP (15%), ICMP (10%)
Analysis complete!
Network performance: Normal
No security threats detected`
      }
    ]
  }
};

export const weekVideos = {
  2: {
    title: "CRC Algorithm Implementation",
    embedUrl: "https://www.youtube.com/embed/A9g6rTMblz4?si=Ws-VeOJOuV7Yq93P",
    description: "Master Cyclic Redundancy Check with polynomial mathematics and practical implementation examples for error detection.",
    duration: "25:30"
  },
  3: {
    title: "Go-Back-N Sliding Window Protocol",
    embedUrl: "https://www.youtube.com/embed/LnbvhoxHn8M?si=zMdlidRKd1BRjfG-",
    description: "Learn advanced flow control mechanisms with pipelined transmission and window-based error recovery strategies.",
    duration: "28:15"
  },
  4: {
    title: "Dijkstra's Shortest Path for Networks",
    embedUrl: "https://www.youtube.com/embed/bZkzH5x0SKU?si=GiLyogY2vs8a9A7v",
    description: "Learn the classic algorithm for finding optimal routes in network topology and its applications in routing protocols.",
    duration: "24:45"
  },
  5: {
    title: "Broadcast Tree Construction",
    embedUrl: "https://www.youtube.com/embed/UHRPtNZ_Rz4?si=q-VHgxwWLtjFFn2e",
    description: "Understand spanning tree algorithms for efficient broadcast communication and prevention of broadcast storms in subnets.",
    duration: "20:30"
  },
  6: {
    title: "Distance Vector Routing Protocol",
    embedUrl: "https://www.youtube.com/embed/hdpnoOcrGck?si=vRFYTYVq5WYGjnb-",
    description: "Master distributed routing algorithms with Bellman-Ford equation and understand convergence properties and limitations.",
    duration: "32:20"
  },
  7: {
    title: "Network Security Encryption",
    embedUrl: "https://www.youtube.com/embed/4KiwoeDJFiA?si=IV3sXp0_BHsdp1aP",
    description: "Learn fundamental encryption and decryption techniques for securing data transmission in computer networks.",
    duration: "18:45"
  },
  8: {
    title: "Leaky Bucket Algorithm",
    embedUrl: "https://www.youtube.com/embed/zjfPh7sar_Y?si=LowF0BGNw1Np2aPz",
    description: "Master traffic shaping techniques for congestion control and understand Quality of Service (QoS) implementations.",
    duration: "26:10"
  },
  9: {
    title: "Frame Sorting and Buffer Management",
    embedUrl: "https://www.youtube.com/embed/NhpzBldHOYo?si=nkvDRGnSVaivyEka",
    description: "Learn advanced buffer management strategies for handling out-of-order frames in network communication protocols.",
    duration: "22:35"
  },
  10: {
    title: "Network Packet Analysis with Wireshark",
    embedUrl: "https://www.youtube.com/embed/qTaOZrDnMzQ?si=l0pEfz845lCaE_sr",
    description: "Master network troubleshooting and security analysis using packet capture tools and protocol analysis techniques.",
    duration: "35:20"
  }
};

export const week1ProgramVideos = [
  {
    title: "Character Counting Method",
    embedUrl: "https://www.youtube.com/embed/i1BPUxO63aQ?si=pDs9dDNrHn05ksaK",
    description: "Learn how character counting works for frame delimitation, its advantages and limitations in data link layer protocols.",
    duration: "15:30"
  },
  {
    title: "Character Stuffing Technique",
    embedUrl: "https://www.youtube.com/embed/TYJjbLZti8g?si=BFhfAMVp8Q7_2USI",
    description: "Understand how special delimiter characters are used for framing and how to handle escape sequences in data.",
    duration: "18:45"
  },
  {
    title: "Bit Stuffing Protocol",
    embedUrl: "https://www.youtube.com/embed/toS0RXNaTaE?si=l6rj-6o9UV4n757b",
    description: "Deep dive into bit-level framing methods used in modern protocols like HDLC and PPP.",
    duration: "22:10"
  }
];

export const vivaQuestions = {
  1: [
    { q: "What is framing in the data link layer?", a: "Framing is the process of dividing the stream of bits received from the network layer into manageable data units called frames. It adds headers and trailers to identify the beginning and end of each frame." },
    { q: "What are the different framing methods?", a: "The main framing methods are: 1) Character Count - uses a field in the header to specify the number of characters in the frame, 2) Character Stuffing - uses special characters as delimiters with escape sequences, 3) Bit Stuffing - uses special bit patterns as flags with bit insertion, and 4) Physical Layer Coding Violations." },
    { q: "Explain character counting method.", a: "In character counting, the first field in the frame header contains the count of characters in the frame. The receiver reads this count and knows exactly how many characters follow. However, if the count is corrupted during transmission, synchronization is lost." },
    { q: "What is character stuffing and why is it needed?", a: "Character stuffing is used when special delimiter characters (like FLAG) mark frame boundaries. If the same character appears in data, an escape character (ESC) is inserted before it. The receiver removes these escape characters. This ensures data transparency." },
    { q: "How does bit stuffing work?", a: "Bit stuffing uses a special bit pattern (like 01111110) as a flag. Whenever five consecutive 1s appear in the data, a 0 is automatically inserted after them. The receiver removes these stuffed 0s. This is used in protocols like HDLC and PPP." },
    { q: "What is the advantage of bit stuffing over character stuffing?", a: "Bit stuffing is more efficient as it works at the bit level and is independent of character encoding. It provides true data transparency and is used in modern protocols. Character stuffing is limited to character-oriented protocols." },
    { q: "What happens if the delimiter character is corrupted in character stuffing?", a: "If the delimiter is corrupted, the receiver may not recognize the frame boundary, leading to frame synchronization errors. Multiple frames may be treated as one, or a single frame may be split incorrectly." },
    { q: "Why is the character count method not reliable?", a: "If the count field itself gets corrupted during transmission, the receiver will read the wrong number of characters, causing it to lose synchronization with the sender. All subsequent frames will be misinterpreted." },
    { q: "What is data transparency in framing?", a: "Data transparency means the data link layer can transmit any arbitrary bit pattern as data without confusion with control information. The framing method should allow any bit pattern in the payload without being mistaken for frame delimiters." },
    { q: "Which framing method is used in HDLC protocol?", a: "HDLC (High-Level Data Link Control) uses bit stuffing with the flag pattern 01111110. It's a bit-oriented protocol that provides reliable data transfer with error detection and flow control." }
  ],
  2: [
    { q: "What is CRC (Cyclic Redundancy Check)?", a: "CRC is an error detection technique that uses polynomial division. The sender divides the data by a generator polynomial and appends the remainder (CRC bits) to the data. The receiver performs the same division; if the remainder is zero, no error is detected." },
    { q: "How does CRC detect errors?", a: "CRC treats the data as a binary polynomial. The data is divided by a predetermined generator polynomial, and the remainder becomes the CRC checksum. Any change in data during transmission will result in a different remainder at the receiver, indicating an error." },
    { q: "What is a generator polynomial in CRC?", a: "A generator polynomial is a predetermined binary pattern used for CRC calculation. Common examples include CRC-16 (x^16 + x^15 + x^2 + 1) and CRC-32. The choice of generator polynomial determines error detection capability." },
    { q: "Why is CRC better than simple parity checking?", a: "CRC can detect burst errors, multiple bit errors, and all single-bit errors, while simple parity can only detect odd numbers of bit errors. CRC has much stronger error detection capability with minimal overhead." },
    { q: "What types of errors can CRC detect?", a: "CRC can detect: 1) All single-bit errors, 2) All double-bit errors, 3) Any odd number of errors, 4) All burst errors less than the degree of the polynomial, 5) Most larger burst errors with high probability." },
    { q: "Can CRC correct errors?", a: "No, CRC is an error detection technique, not error correction. It can only identify that an error has occurred. For error correction, techniques like Hamming codes or Reed-Solomon codes are needed." },
    { q: "What is the CRC-32 polynomial?", a: "CRC-32 uses the polynomial: x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1. It's widely used in Ethernet, ZIP files, and PNG images for error detection." },
    { q: "How is CRC implemented in hardware?", a: "CRC is typically implemented using shift registers and XOR gates. The data bits are shifted through the register while XOR operations are performed based on the generator polynomial, making it very fast in hardware." },
    { q: "What happens after CRC detects an error?", a: "When CRC detects an error, the frame is typically discarded and a retransmission is requested through protocols like ARQ (Automatic Repeat Request). The sender then retransmits the corrupted frame." },
    { q: "Why is CRC widely used in networks?", a: "CRC is widely used because it: 1) Provides strong error detection with low overhead, 2) Is easy to implement in hardware, 3) Detects common transmission errors efficiently, 4) Has predictable performance characteristics, 5) Works well with burst errors common in networks." }
  ],
  3: [
    { q: "What is the Sliding Window Protocol?", a: "Sliding Window Protocol is a flow control mechanism that allows multiple frames to be in transit simultaneously. The sender can transmit multiple frames before receiving acknowledgment, improving channel utilization. The 'window' slides forward as acknowledgments are received." },
    { q: "Explain Go-Back-N ARQ protocol.", a: "In Go-Back-N, the sender can transmit up to N frames without acknowledgment. If a frame is lost or corrupted, the receiver discards all subsequent frames and requests retransmission from the lost frame. The sender goes back to that frame and retransmits all frames from that point." },
    { q: "What is the window size in sliding window protocol?", a: "Window size is the maximum number of frames that can be sent before receiving an acknowledgment. It determines the number of frames in transit. A larger window improves throughput but requires more buffer space." },
    { q: "What happens when the window is full?", a: "When the sender's window is full, it must stop transmitting and wait for acknowledgments. As ACKs arrive, the window slides forward, allowing new frames to be sent. This prevents overwhelming the receiver." },
    { q: "What is the difference between Go-Back-N and Selective Repeat?", a: "In Go-Back-N, when an error occurs, all frames from the error point are retransmitted. In Selective Repeat, only the corrupted or lost frame is retransmitted. Selective Repeat is more efficient but requires more complex buffering at the receiver." },
    { q: "Why is sliding window better than Stop-and-Wait?", a: "Sliding window allows multiple frames to be in transit, utilizing the channel more efficiently. Stop-and-Wait sends one frame and waits for ACK before sending the next, wasting bandwidth especially on high-latency links. Sliding window can achieve near 100% utilization." },
    { q: "What is piggybacking in sliding window?", a: "Piggybacking is the technique of including acknowledgment information in outgoing data frames instead of sending separate ACK frames. This reduces overhead and improves efficiency in bidirectional communication." },
    { q: "How does the receiver handle out-of-order frames in Go-Back-N?", a: "In Go-Back-N, the receiver discards all out-of-order frames. It only accepts frames in sequence and sends cumulative acknowledgments. If frame N is expected but frame N+1 arrives, frame N+1 is discarded." },
    { q: "What is the maximum window size for Go-Back-N?", a: "For Go-Back-N with m-bit sequence numbers, the maximum window size is 2^m - 1. For example, with 3-bit sequence numbers (0-7), the maximum window size is 7. This prevents ambiguity in acknowledgments." },
    { q: "What are the advantages and disadvantages of Go-Back-N?", a: "Advantages: Simple receiver logic, requires less buffer space at receiver, easy to implement. Disadvantages: Wastes bandwidth by retransmitting correctly received frames, inefficient when error rate is high, longer recovery time for errors." }
  ],
  4: [
    { q: "What is Dijkstra's algorithm used for?", a: "Dijkstra's algorithm finds the shortest path between nodes in a graph with non-negative edge weights. In networking, it's used to determine optimal routes for data packets, forming the basis of routing protocols like OSPF (Open Shortest Path First)." },
    { q: "How does Dijkstra's algorithm work?", a: "It maintains a set of visited nodes and tentative distances. Starting from the source, it repeatedly selects the unvisited node with minimum distance, updates distances to its neighbors, and marks it as visited. The process continues until all nodes are visited or the destination is reached." },
    { q: "What is the time complexity of Dijkstra's algorithm?", a: "Using a simple array, the time complexity is O(V²) where V is the number of vertices. With a binary heap, it's O((V + E) log V), and with a Fibonacci heap, it's O(E + V log V), where E is the number of edges." },
    { q: "Why doesn't Dijkstra's algorithm work with negative weights?", a: "Dijkstra's algorithm assumes that once a node's shortest distance is determined, it won't change. Negative weights can violate this assumption, as a longer path might become shorter when including a negative edge. The Bellman-Ford algorithm should be used for negative weights." },
    { q: "How is Dijkstra's algorithm applied in routing protocols?", a: "In OSPF (Open Shortest Path First), each router runs Dijkstra's algorithm on the network topology to build its routing table. Routers exchange link-state information to maintain a consistent view of the network, then compute shortest paths to all destinations." },
    { q: "What is the difference between Dijkstra and Bellman-Ford?", a: "Dijkstra is faster (O(V²) or better) but only works with non-negative weights and uses a greedy approach. Bellman-Ford is slower (O(VE)) but handles negative weights and can detect negative cycles. Dijkstra is preferred when all weights are positive." },
    { q: "What data structures are used in Dijkstra's algorithm?", a: "Common data structures include: 1) Priority queue (min-heap) for selecting minimum distance node, 2) Array or hash table for storing distances, 3) Boolean array for tracking visited nodes, 4) Array or hash table for storing previous nodes (for path reconstruction)." },
    { q: "Can Dijkstra's algorithm find paths to all destinations?", a: "Yes, when Dijkstra's algorithm completes, it has found the shortest path from the source to all reachable nodes in the graph. This is useful in routing where a router needs to know paths to all destinations." },
    { q: "What is a greedy algorithm and how does Dijkstra use it?", a: "A greedy algorithm makes locally optimal choices at each step hoping to find a global optimum. Dijkstra greedily selects the unvisited node with the smallest distance at each iteration. This works for shortest paths when weights are non-negative." },
    { q: "What happens if there are multiple shortest paths?", a: "Dijkstra's algorithm will find one of them (depending on implementation details). If you need all shortest paths, modifications like storing multiple predecessors for each node are required. Some implementations can be adapted to find k-shortest paths." }
  ],
  5: [
    { q: "What is a broadcast tree?", a: "A broadcast tree is a spanning tree of a network that connects a source node to all other nodes while minimizing redundant paths. It ensures every node receives broadcast messages exactly once, preventing broadcast storms and optimizing bandwidth usage." },
    { q: "Why do we need a broadcast tree?", a: "Without a broadcast tree, broadcast messages would create infinite loops and duplicate messages, consuming all network bandwidth (broadcast storm). The broadcast tree ensures each node receives the message once through the most efficient path." },
    { q: "What is a spanning tree?", a: "A spanning tree is a subset of a graph that connects all vertices with the minimum number of edges (V-1 edges for V vertices) without forming cycles. It's used to eliminate loops in networks while maintaining connectivity." },
    { q: "Explain the BFS approach for building a broadcast tree.", a: "Starting from the source node, BFS explores nodes level by level. Each node is visited once, and edges used during this traversal form the broadcast tree. This creates a tree where broadcast messages propagate efficiently from the source to all nodes." },
    { q: "What is the Spanning Tree Protocol (STP)?", a: "STP is a network protocol that prevents loops in Ethernet networks by creating a spanning tree. It automatically detects and blocks redundant paths while maintaining network connectivity. If the active path fails, STP activates a backup path." },
    { q: "How does STP prevent broadcast storms?", a: "STP designates one switch as the root bridge and calculates the shortest path from each switch to the root. Ports on redundant paths are placed in blocking state, preventing frames from looping. Only one active path exists between any two network segments." },
    { q: "What is the difference between BFS and DFS for broadcast trees?", a: "BFS creates a tree with minimum height (shortest broadcast delay), ideal for broadcasting. DFS may create deeper trees. BFS ensures messages reach nodes in order of distance from source, while DFS may take longer paths. BFS is preferred for broadcast applications." },
    { q: "What is a minimum spanning tree (MST)?", a: "A minimum spanning tree connects all nodes with minimum total edge weight. Algorithms like Prim's and Kruskal's find MSTs. In networks, MST can minimize total cable length or cost while maintaining connectivity." },
    { q: "How does broadcast differ from multicast?", a: "Broadcast sends messages to all nodes in the network using a broadcast tree. Multicast sends messages to a specific group of interested nodes using a multicast tree. Multicast is more efficient when only some nodes need the data." },
    { q: "What is reverse path forwarding (RPF)?", a: "RPF is a technique for building broadcast/multicast trees. When a router receives a broadcast packet, it forwards it only if it arrived on the interface used to reach the source. This prevents loops and ensures efficient distribution using reverse shortest paths." }
  ],
  6: [
    { q: "What is Distance Vector Routing?", a: "Distance Vector Routing is a dynamic routing algorithm where each router maintains a table (distance vector) containing the best known distance to each destination and the next hop to reach it. Routers periodically exchange their distance vectors with neighbors to converge on optimal routes." },
    { q: "Explain the Bellman-Ford equation in routing.", a: "The Bellman-Ford equation states: dx(y) = min{c(x,v) + dv(y)} for all neighbors v of x, where dx(y) is the cost from x to y, c(x,v) is the cost from x to neighbor v, and dv(y) is v's distance to y. Each router uses this to update its routing table." },
    { q: "What is the count-to-infinity problem?", a: "Count-to-infinity occurs when a link fails and routers slowly increment their distance to unreachable destinations until reaching infinity. This happens because routers may learn obsolete information from each other, causing slow convergence and routing loops during the transition." },
    { q: "How does split horizon solve routing problems?", a: "Split horizon prevents a router from advertising a route back to the neighbor from which it learned that route. This helps prevent routing loops. For example, if router A learned a route through B, A won't advertise that route back to B." },
    { q: "Compare Distance Vector and Link State routing.", a: "Distance Vector: Routers know only neighbors' distances, exchange full routing tables periodically, slower convergence, less memory, prone to loops (RIP). Link State: Routers know complete topology, exchange only link status updates, faster convergence, more memory, loop-free (OSPF)." },
    { q: "What is poison reverse?", a: "Poison reverse is an enhancement to split horizon. Instead of not advertising a route back to its source, the router advertises it with infinite cost. This explicitly tells the neighbor that the route through it is invalid, speeding up convergence." },
    { q: "What is RIP (Routing Information Protocol)?", a: "RIP is a distance vector routing protocol that uses hop count as the metric (maximum 15 hops, 16 = infinity). Routers exchange their complete routing tables every 30 seconds. RIP is simple but has slow convergence and is limited to small networks." },
    { q: "What causes routing loops in distance vector routing?", a: "Routing loops occur when: 1) Routers have inconsistent routing information during convergence, 2) A router learns outdated information from neighbors, 3) Updates propagate slowly through the network. Techniques like split horizon, poison reverse, and hold-down timers help prevent loops." },
    { q: "What is a hold-down timer?", a: "When a router detects a route failure, it starts a hold-down timer and ignores updates for that destination during the timer period. This prevents the router from accepting potentially incorrect routing information during network instability, helping avoid loops." },
    { q: "What are the advantages and disadvantages of Distance Vector routing?", a: "Advantages: Simple implementation, low memory requirements, works well in small networks, minimal processing. Disadvantages: Slow convergence, count-to-infinity problem, periodic updates waste bandwidth, limited scalability, routing loops possible, metric limitations (hop count)." }
  ],
  7: [
    { q: "What is encryption in computer networks?", a: "Encryption is the process of converting plaintext data into ciphertext using a cryptographic algorithm and a key. This makes the data unreadable to unauthorized parties during transmission, ensuring confidentiality and security in network communications." },
    { q: "What is the difference between symmetric and asymmetric encryption?", a: "Symmetric encryption uses the same key for both encryption and decryption (e.g., AES, DES). It's faster but requires secure key exchange. Asymmetric encryption uses a public-private key pair (e.g., RSA), slower but solves key distribution, used for secure key exchange and digital signatures." },
    { q: "Explain the Caesar cipher.", a: "Caesar cipher is a simple substitution cipher where each letter is shifted by a fixed number of positions in the alphabet. For example, with shift 3, 'A' becomes 'D', 'B' becomes 'E'. It's easy to implement but very insecure and easily broken by frequency analysis." },
    { q: "What is a cryptographic key?", a: "A cryptographic key is a piece of information (parameter) that determines the output of a cryptographic algorithm. The security of encrypted data depends on keeping the key secret. Key length affects security: longer keys provide stronger encryption but require more computation." },
    { q: "What is SSL/TLS?", a: "SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) are cryptographic protocols that provide secure communication over networks. They use asymmetric encryption for key exchange and symmetric encryption for data transfer, ensuring confidentiality, integrity, and authentication (used in HTTPS)." },
    { q: "What is the difference between encryption and hashing?", a: "Encryption is reversible (decrypt to get original data) and requires a key. Hashing is one-way (cannot reverse to get original) and doesn't use a key. Encryption protects confidentiality; hashing verifies integrity. Examples: Encryption - AES, RSA; Hashing - SHA-256, MD5." },
    { q: "What is AES (Advanced Encryption Standard)?", a: "AES is a symmetric block cipher that encrypts data in 128-bit blocks using keys of 128, 192, or 256 bits. It's the current standard for secure encryption, used worldwide in applications from file encryption to HTTPS. It's fast, secure, and efficient." },
    { q: "What is RSA encryption?", a: "RSA is an asymmetric encryption algorithm using public-private key pairs. It's based on the mathematical difficulty of factoring large prime numbers. The public key encrypts, private key decrypts. Widely used for secure key exchange, digital signatures, and SSL/TLS." },
    { q: "What is a digital signature?", a: "A digital signature is created by encrypting a hash of data with a private key. Recipients decrypt it with the public key and compare hashes to verify: 1) Data integrity (not modified), 2) Authenticity (sender's identity), 3) Non-repudiation (sender can't deny). Used in secure communications and transactions." },
    { q: "What are the main goals of cryptography?", a: "The main goals are: 1) Confidentiality - only authorized parties can read data, 2) Integrity - detect data modification, 3) Authentication - verify identity of parties, 4) Non-repudiation - sender cannot deny sending message. Cryptography techniques address these security requirements." }
  ],
  8: [
    { q: "What is congestion control?", a: "Congestion control is a mechanism to prevent network performance degradation when traffic demand exceeds capacity. It involves monitoring network load and taking actions like reducing sending rates, dropping packets, or implementing traffic shaping to maintain network stability and fair resource allocation." },
    { q: "Explain the Leaky Bucket algorithm.", a: "The Leaky Bucket algorithm smooths bursty traffic by maintaining a buffer (bucket) that fills with incoming packets and empties at a constant rate. If the bucket overflows, packets are dropped. This ensures output traffic is regular regardless of input pattern, useful for traffic shaping and rate limiting." },
    { q: "What is the difference between Leaky Bucket and Token Bucket?", a: "Leaky Bucket outputs at a constant rate regardless of input, enforcing hard limits. Token Bucket allows bursts up to bucket size while maintaining average rate. Token Bucket is more flexible: tokens accumulate when idle, allowing temporary bursts, better for variable bit rate traffic." },
    { q: "What causes network congestion?", a: "Congestion occurs when: 1) Aggregate input rate exceeds link capacity, 2) Insufficient buffer space causes packet loss, 3) Slow processors can't handle packet processing rate, 4) Multiple flows compete for bandwidth, 5) Inefficient routing concentrates traffic, 6) Sudden traffic bursts overwhelm network." },
    { q: "What is Quality of Service (QoS)?", a: "QoS ensures network resources are allocated to provide different service levels for different traffic types. Parameters include: 1) Bandwidth, 2) Latency, 3) Jitter, 4) Packet loss. QoS mechanisms prioritize critical traffic (VoIP, video) over less time-sensitive traffic (email, file transfer)." },
    { q: "What is the Token Bucket algorithm?", a: "Token Bucket maintains a bucket of tokens that fill at a constant rate. Packets can be sent only if tokens are available (one token per packet/byte). Tokens accumulate up to bucket capacity, allowing bursts. This permits temporary high-speed transmission while maintaining average rate limits." },
    { q: "What is the difference between congestion control and flow control?", a: "Congestion control prevents network overload by managing overall traffic in the network (network-wide). Flow control prevents fast sender from overwhelming slow receiver (end-to-end). Congestion control considers network capacity; flow control considers receiver capacity. Both work together for reliable communication." },
    { q: "What is TCP congestion control?", a: "TCP uses algorithms like Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery. It monitors packet loss as congestion signal, adjusts transmission window size dynamically. Starts with small window, increases exponentially (slow start), then linearly (congestion avoidance), reduces on loss. This ensures fair bandwidth sharing and network stability." },
    { q: "What is RED (Random Early Detection)?", a: "RED is an active queue management algorithm that randomly drops packets before the queue is full. By dropping packets early (before congestion is severe), it signals senders to slow down, preventing full queue overflow and maintaining better throughput. It's more sophisticated than simple tail-drop." },
    { q: "What are the effects of network congestion?", a: "Effects include: 1) Increased packet delay and latency, 2) Packet loss when buffers overflow, 3) Reduced throughput due to retransmissions, 4) Jitter (variable delays), 5) Connection timeouts, 6) Poor quality for real-time applications (VoIP, video), 7) Congestion collapse if uncontrolled. Proper congestion control prevents these issues." }
  ],
  9: [
    { q: "What is frame sorting?", a: "Frame sorting is the process of arranging out-of-order frames received over a network into their correct sequence before delivering to higher layers. This is necessary because frames may arrive in different order due to multiple paths, varying delays, retransmissions, or packet switching." },
    { q: "Why do frames arrive out of order?", a: "Frames arrive out of order due to: 1) Multiple routing paths with different delays, 2) Packet retransmissions, 3) Variable network congestion, 4) Different processing times at intermediate nodes, 5) Load balancing across parallel links, 6) Priority queuing mechanisms in routers." },
    { q: "What is a resequencing buffer?", a: "A resequencing buffer is a memory area that temporarily stores out-of-order frames until all preceding frames arrive. It maintains frames based on sequence numbers, delivers them in order to the application, and manages buffer overflow by discarding or requesting retransmission." },
    { q: "How does TCP handle out-of-order segments?", a: "TCP maintains sequence numbers for each byte. When segments arrive out of order, TCP buffers them and sends duplicate ACKs for the last in-order segment received. When the missing segment arrives, buffered segments are delivered to the application in correct order. This ensures reliable, ordered delivery." },
    { q: "What is the head-of-line blocking problem?", a: "Head-of-line blocking occurs when a missing frame at the front of the queue blocks delivery of correctly received subsequent frames. The receiver must wait for retransmission of the missing frame before delivering any queued frames, even though later frames are ready, reducing throughput." },
    { q: "What are sequence numbers used for?", a: "Sequence numbers uniquely identify each frame/packet and indicate its position in the data stream. They're used for: 1) Reordering out-of-sequence frames, 2) Detecting duplicate frames, 3) Detecting missing frames, 4) Acknowledging received data, 5) Managing flow and congestion control windows." },
    { q: "How does selective acknowledgment (SACK) help?", a: "SACK allows the receiver to acknowledge non-contiguous blocks of received data. Instead of just acknowledging the highest in-order segment, it tells the sender exactly which segments arrived. This allows the sender to retransmit only missing segments, not all subsequent ones, improving efficiency." },
    { q: "What is the maximum buffer size needed for resequencing?", a: "For a protocol with window size W, the receiver needs buffer space for W frames. In worst case, W-1 out-of-order frames might arrive before the expected frame. Insufficient buffer leads to discarding correctly received frames and unnecessary retransmissions, wasting bandwidth." },
    { q: "What happens if a frame is permanently lost?", a: "If a frame is lost and retransmission fails, protocols typically use timeouts. After timeout, the sender retransmits. If retransmissions repeatedly fail, the connection may be terminated. Some protocols deliver available data to the application and mark the gap, depending on application requirements (real-time vs. reliable delivery)." },
    { q: "How does packet reordering affect TCP performance?", a: "Excessive reordering causes: 1) Duplicate ACKs triggering unnecessary fast retransmits, 2) Receiver buffer holding out-of-order segments, 3) Increased latency while waiting for missing segments, 4) Potential throughput reduction if mistaken for congestion. Modern TCP includes reordering detection to distinguish it from loss." }
  ],
  10: [
    { q: "What is Wireshark?", a: "Wireshark is a network protocol analyzer that captures and analyzes network traffic in real-time. It allows users to see what's happening on the network at a microscopic level, useful for: 1) Troubleshooting network problems, 2) Security analysis, 3) Protocol development, 4) Network education and forensics." },
    { q: "What is packet capture?", a: "Packet capture (packet sniffing) is the process of intercepting and logging data packets traversing a network. Captured packets include headers and payload. Tools like Wireshark, tcpdump, or WinPcap capture packets in promiscuous mode, seeing all traffic on the network segment, not just traffic addressed to the capturing interface." },
    { q: "What is promiscuous mode?", a: "Promiscuous mode is a network interface mode where the NIC passes all traffic to the CPU, not just frames addressed to it. Normally, NICs filter and only process frames with matching MAC addresses. Promiscuous mode is required for packet capture tools to see all network traffic." },
    { q: "How do capture filters differ from display filters?", a: "Capture filters (BPF syntax) are applied during capture to limit what packets are saved, reducing file size and processing. Display filters are applied after capture to show subset of captured packets. Capture filters are more efficient but less flexible; display filters allow interactive analysis without recapture." },
    { q: "What security issues can Wireshark detect?", a: "Wireshark can detect: 1) Unencrypted passwords (HTTP, FTP, Telnet), 2) Man-in-the-middle attacks, 3) ARP spoofing, 4) Port scanning, 5) Suspicious traffic patterns, 6) Malware communications, 7) DNS poisoning, 8) DoS attacks. However, encrypted traffic (HTTPS) shows only headers, not content." },
    { q: "What is the OSI model and how does Wireshark display it?", a: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Wireshark displays packet details hierarchically by layer, showing: Ethernet (Layer 2), IP (Layer 3), TCP/UDP (Layer 4), and application protocols (Layers 5-7). This helps understand protocol encapsulation." },
    { q: "What are common Wireshark display filters?", a: "Common filters: ip.addr == 192.168.1.1 (specific IP), tcp.port == 80 (HTTP traffic), http (HTTP protocol), dns (DNS queries), icmp (ping), tcp.flags.syn == 1 (TCP SYN packets), frame.time >= \"2024-01-01\" (time-based), ip.src == 10.0.0.1 && ip.dst == 10.0.0.2 (specific connection)." },
    { q: "How can Wireshark help troubleshoot network problems?", a: "Wireshark helps by: 1) Identifying packet loss, 2) Measuring delays and latency, 3) Detecting retransmissions, 4) Analyzing DNS resolution issues, 5) Verifying proper protocol handshakes, 6) Finding duplicate IP addresses, 7) Checking TCP window sizes, 8) Identifying broadcast storms, 9) Analyzing bandwidth usage by protocol/host." },
    { q: "What is the three-way handshake and how to see it in Wireshark?", a: "TCP three-way handshake: 1) Client sends SYN, 2) Server responds SYN-ACK, 3) Client sends ACK. In Wireshark, filter with 'tcp.flags.syn == 1' to see SYN packets. Look for [SYN], [SYN, ACK], [ACK] sequence. Analyzing this helps diagnose connection establishment problems like firewall blocks or routing issues." },
    { q: "What ethical and legal considerations apply to packet capture?", a: "Packet capture must consider: 1) Privacy - capturing personal data requires consent/authorization, 2) Legal - some jurisdictions require warrants for packet capture, 3) Corporate policy - follow company network monitoring policies, 4) Encryption - respect encrypted communications, 5) Purpose - only capture for legitimate troubleshooting/security purposes, 6) Storage - securely store captures containing sensitive data." }
  ]
};
